'use client'
import { useTripDetail } from '@/app/provider';
import React, { useEffect, useRef } from 'react'
import { Activity, Itinerary } from './Chatbox';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const GlobalMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const tripDetailContext = useTripDetail();
  const tripDetailInfo = tripDetailContext?.tripDetailInfo;

  useEffect(() => {
    // Load Google Maps JS API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      const { google } = window;
      if (google && mapContainer.current) {
        const map = new google.maps.Map(mapContainer.current, {
          center: { lat: 20.0, lng: 0.0 }, // Centered view of the world
          zoom: 2,
          mapTypeId: 'roadmap'
        });

        // Add markers for activities if tripDetailInfo exists
        if (tripDetailInfo && tripDetailInfo.itinerary) {
          const itineraryArray = tripDetailInfo.itinerary as any as Itinerary[];
          itineraryArray.forEach((itinerary: Itinerary) => {
            const activitiesArray = itinerary.activities as any as Activity[];
            activitiesArray.forEach((activity: Activity) => {
              if (
                activity?.geo_coordinates?.longitude &&
                activity?.geo_coordinates?.latitude
              ) {
                const marker = new google.maps.Marker({
                  position: {
                    lat: activity.geo_coordinates.latitude,
                    lng: activity.geo_coordinates.longitude,
                  },
                  map: map,
                  title: activity.place_name || "Activity Location",
                });

                // Add info window
                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div style="padding: 8px; max-width: 200px;">
                      <h4 style="margin: 0 0 4px 0; font-size: 14px;">${activity.place_name || "Location"}</h4>
                      <p style="margin: 0; font-size: 12px; color: #666;">${activity.place_details || ""}</p>
                    </div>
                  `,
                });

                marker.addListener("click", () => {
                  infoWindow.open(map, marker);
                });
              }
            });
          });
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [tripDetailInfo]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{
          width: "95%",
          height: "85vh",
          borderRadius: 20,
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default GlobalMap;
