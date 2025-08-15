"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios, { Axios } from "axios";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDays from "./SelectDays";
import FinalUi from "./FinalUi";
// import { useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  origin: string;
  destination: string;
  duration: string;
  budget: string;
  group_size: string;
  hotels: Hotel[];
  itinerary: Itinerary;
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary = {
  map(arg0: (dayData: any) => { title: string; content: React.JSX.Element; }): unknown;
  day: number;
  day_plan: string;
  best_time_to_visit: string;
  activities: Activity[];
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  const SaveTripDetail = useMutation(api.tripDetail.createTripDetail);
  const { userDetail, setUserDetail } = useUserDetail();
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const onSend = async () => {
    if (!userInput?.trim()) {
      return;
    }
    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput ?? "",
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });

    // console.log("TRIP",result.data);

    !isFinal &&
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

    if (isFinal) {
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      setIsFinal(false);
      const tripId = uuidv4();
      SaveTripDetail({
        tripDetail: result?.data?.trip_plan,
        tripId: tripId,
        uid: userDetail?._id,
      });
    }

    // console.log(result.data);
    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      //Budget UI Components
      return (
        <BudgetUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      //groupSize ui component
      return (
        <GroupSizeUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "tripDuration") {
      // triDuration Ui components
      return (
        <SelectDays
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "final") {
      // final Ui components
      return <FinalUi viewTrip={() => console.log()} disable={!tripDetail} />;
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final") {
      setIsFinal(true);
      setUserInput("ok, Great!");
      // onSend();
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[83vh] flex flex-col bg-secondary rounded-2xl p-5">
      {messages?.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}
      {/* Display Message */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>

      {/* user Input */}
      <section>
        <div className="border-rounded-2xl p-4 relative">
          <Textarea
            placeholder="Create plan here...."
            className="w-full h-28 bg-transparent border-2 focus-visible:ring-0 shadow-none "
            onChange={(event) => setUserInput(event.target.value ?? "")}
            value={userInput}
          />

          <Button
            size={"icon"}
            className="absolute  bottom-6 right-6"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
