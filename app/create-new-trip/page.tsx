import React from "react";
import Chatbox from "./_components/Chatbox";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-">
      <div>
        <Chatbox />
      </div>

      <div className="col-span-2">
        <Itinerary />
      </div>
    </div>
  );
}
import Itinerary from "./_components/itinerary";

export default CreateNewTrip;
