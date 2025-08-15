"use client";
import { Timeline } from "@/components/ui/timeline";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Search,
  Star,
  Ticket,
  Timer,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { div } from "motion/react-client";
import Link from "next/link";
import axios from "axios";
import PlaceCardItem from "./PlaceCardItem";
import HotelCardItem from "./HotelCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./Chatbox";

// const TRIP_DATA = {
//   origin: "Mumbai",
//   destination: "Rajasthan",
//   duration: "3 days",
//   budget: "Luxury",
//   group_size: "Solo",
//   hotels: [
//     {
//       hotel_name: "The Oberoi Rajvilas",
//       hotel_image_url:
//         "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//       hotel_address: "Goner Road, Jaipur, Rajasthan 302031, India",
//       price_per_night: 500,
//       description:
//         "A luxurious 5-star hotel set in a beautiful fort-like setting with world-class amenities and spa.",
//       rating: 4.5,
//       geo_coordinates: { latitude: 26.8508, longitude: 75.8662 },
//     },
//     {
//       hotel_name: "ITC Rajputana",
//       hotel_image_url:
//         "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
//       price_per_night: 350,
//       description:
//         "A 5-star hotel with a blend of traditional Rajasthani architecture and modern amenities.",
//       hotel_address: "Palace Road, Jaipur, Rajasthan 302006, India",
//       rating: 4.2,
//       geo_coordinates: { latitude: 26.9276, longitude: 75.7938 },
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       city: "Jaipur",
//       day_plan:
//         "Arrive in Jaipur, check into hotel, explore Amer Fort and Jantar Mantar.",
//       best_time_to_visit: "October to March",
//       activities: [
//         {
//           place_name: "Amer Fort",
//           place_details:
//             "Historic fort known for its artistic Hindu style elements.",
//           place_image_url:
//             "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
//           geo_coordinates: { latitude: 26.9492, longitude: 75.8799 },
//           place_address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001, India",
//           ticket_pricing: "$10",
//           time_travel_each_location: "30 min from hotel",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Jantar Mantar",
//           place_details:
//             "UNESCO World Heritage site featuring the world's largest stone sundial.",
//           place_image_url:
//             "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
//           geo_coordinates: { latitude: 26.9177, longitude: 75.7979 },
//           place_address:
//             "Gangori Bazaar, J.D.A. Market, Jaipur, Rajasthan 302002, India",
//           ticket_pricing: "$5",
//           time_travel_each_location: "15 min from Amer Fort",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 2,
//       city: "Ranthambore",
//       day_plan: "Travel to Ranthambore for a wildlife safari adventure.",
//       best_time_to_visit: "October to June",
//       activities: [
//         {
//           place_name: "Wildlife Safari",
//           place_details:
//             "Safari in Ranthambore National Park, famous for tigers and wildlife.",
//           place_image_url:
//             "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b",
//           geo_coordinates: { latitude: 26.4913, longitude: 76.0858 },
//           place_address:
//             "Ranthambore National Park, Sawai Madhopur, Rajasthan 322001, India",
//           ticket_pricing: "$50",
//           time_travel_each_location: "4.5 hours drive from Jaipur",
//           best_time_to_visit: "Early morning or late afternoon",
//         },
//       ],
//     },
//     {
//       day: 3,
//       city: "Jaipur",
//       day_plan: "Return to Jaipur, shopping in Pink City, depart for Mumbai.",
//       best_time_to_visit: "October to March",
//       activities: [
//         {
//           place_name: "Shopping in Pink City",
//           place_details:
//             "Explore local markets for handicrafts, textiles, and jewelry.",
//           place_image_url:
//             "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
//           geo_coordinates: { latitude: 26.9124, longitude: 75.7873 },
//           place_address: "Pink City, Jaipur, Rajasthan 302001, India",
//           ticket_pricing: "Free",
//           time_travel_each_location: "10 min from hotel",
//           best_time_to_visit: "Evening",
//         },
//       ],
//     },
//   ],
// };

function Itinerary() {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  });

  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem hotel={hotel} />
              ))}
            </div>
          ),
        },

        ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <p className="mb-2 font-bold text-xl text-primary">
                Best Time : {dayData?.best_time_to_visit}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {dayData?.activities.map((activity, index) => (
                  <PlaceCardItem activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];

  return (
    <div className="relative w-full overflow-auto h-[83vh]">
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div>
          <Image
            src={"/placeholder.png"}
            alt="travel"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-3xl"
          />

          <h2 className="flex gap-2 text-3xl text-black left-20 items-center absolute bottom-10">
            <ArrowLeft /> Getting to know you to build perfect trip here...
          </h2>
        </div>
      )}
    </div>
  );
}

export default Itinerary;
