"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-15">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover the World's Most Beautiful Destinations to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800  p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Explore breathtaking landscapes and unforgettable experiences.
              </span>{" "}
              From pristine beaches to majestic mountains, discover the perfect destination for your next adventure. Each location offers unique culture, stunning views, and memories that last a lifetime.
            </p>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beautiful destination"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-2xl"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Tropical Paradise",
    title: "Bora Bora - French Polynesia",
    src: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Alpine Wonderland",
    title: "Lake Louise - Canada",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Mediterranean Gem",
    title: "Amalfi Coast - Italy",
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Northern Lights",
    title: "Reykjavik - Iceland",
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Island Utopia",
    title: "Palawan - Philippines",
    src: "https://images.unsplash.com/photo-1551214012-84f95e060dee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Mountain Paradise",
    title: "Banff National Park - Canada",
    src: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Cultural Heritage",
    title: "Kyoto - Japan",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Safari Adventure",
    title: "Serengeti - Tanzania",
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "City of Love",
    title: "Paris - France",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Underwater Paradise",
    title: "Great Barrier Reef - Australia",
    src: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
];
