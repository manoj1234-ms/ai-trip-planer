"use client";
import { Button } from "@/components/ui/button";
import { Star, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Hotel } from "./Chatbox";
import axios from "axios";

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {

  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    hotel && GetGooglePlaceDetail();
  }, [hotel]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: hotel?.hotel_name,
    });
    if(result?.data?.console.e){
      return ;
    }
    setPhotoUrl(result?.data);
  };

  return (
    <div className="flex flex-col gap-1">
      <Image
        src={photoUrl?photoUrl:"/placeholder.png"}
        alt="place-image"
        width={400}
        height={200}
        className="rounded-xl shadow object-cover mb-2"
      />
      <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
      <h2 className="text-gray-500 text-lg">{hotel?.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-green-600">
          <Wallet />
          {hotel?.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2">
          <Star /> {hotel?.rating}
        </p>
      </div>

      <Button asChild variant="outline" className="mt-1  w-full">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </Button>
    </div>
  );
}

export default HotelCardItem;
