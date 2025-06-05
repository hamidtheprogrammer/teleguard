import { dummyAppointments } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ManageAppointments from "@/components/manage-appointments";
import Link from "next/link";
import React from "react";

const page = () => {
  if (dummyAppointments && dummyAppointments.length > 1) {
    return (
      <div className="pl-1 h-full">
        <Card className="h-full">
          <div className="h-full flex flex-col justify-center items-center gap-4">
            <p className="font-bold text-2xl">No appointments</p>
            <Button>
              <Link href={"appointments/doctors"}>Book now</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  return <ManageAppointments />;
};

export default page;
