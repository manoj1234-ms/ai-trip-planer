"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { userDetailContext } from "@/context/userDetailContext";
import { TripContextType, TripDetailContext } from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/Chatbox";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      // Save New User if not exist
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      setUserDetail(result);
    }
  };
  return (
    <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </userDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(userDetailContext);
};

export const useTripDetail = ():TripContextType|undefined => {
  return useContext(TripDetailContext);
};
