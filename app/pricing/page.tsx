import { PricingTable } from "@clerk/nextjs";
import { div } from "motion/react-client";
import React from "react";

function Pricing() {
  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl my-5 text-center">
        Let's start trip plan with AI 🤖- Pick your Plan{" "}
      </h2>
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable />
      </div>
    </div>
  );
}

export default Pricing;
