"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Activity } from "./Chatbox";

type Props = {
  activity: Activity;
};
function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: activity?.place_name + ":" + activity?.place_address,
    });
    if (result?.data?.console.e) {
      return;
    }
    setPhotoUrl(result?.data);
  };

  return (
    <div>
      <Image
        src={photoUrl ? photoUrl : "/placeholder.png"}
        alt={activity?.place_name}
        width={400}
        height={200}
        className="object-cover rounded-xl shadow mb-2"
      />
      <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
      <p className="text-gray-500 line-clamp-2">{activity?.place_details}</p>
      <h2 className="flex gap-2 text-blue-500 line-clamp-1">
        {" "}
        <Ticket /> {activity?.ticket_pricing}
      </h2>
      <p className="flex text-orange-400 gap-2 line-clamp-1">
        {" "}
        <Clock />
        {activity?.best_time_to_visit}
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size={"sm"} variant={"outline"} className="w-full mt-2">
          View Details
          <ExternalLink />
        </Button>
      </a>
    </div>
  );
}

export default PlaceCardItem;
