import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="pl-1 h-full">
      <Card className="h-full flex flex-col justify-center items-center gap-3">
        <div>
          <h1>Appointment successfully Booked:)</h1>
          <Link href={"/appointments"}>
            <Button>Return</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
