import React from "react";
import { Card } from "@/components/ui/card";
import { DoctorForm } from "../../form/DoctorForm";

const page = () => {
  return (
    <div className="px-1 h-full">
      <Card className="h-full">
        <DoctorForm />
      </Card>
    </div>
  );
};

export default page;
