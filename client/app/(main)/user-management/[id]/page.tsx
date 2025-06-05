import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeftCircleIcon } from "lucide-react";
import Lifestyle_Families from "@/components/userprofile/Lifestyle&Families";
import Contact from "@/components/userprofile/Contact";
import Link from "next/link";
import MedicalHistory from "@/components/userprofile/MedicalHistory";
import Medications from "@/components/userprofile/Medications";
import LaboratoryResults from "@/components/userprofile/Laboratory";
import { Card } from "@/components/ui/card";

const GetUserById = ({ params }: { params: any }) => {
  const { id } = params;
  console.log(params);
  return (
    <div className="pl-1 h-[90%]">
      <div className="fixedz inset-0z h-full w-full gap-1 text-gray-600 flex flex-col bg-slate-100">
        <Card className="flex justify-between h-[15%] items-center p-4 rounded-md bg-white">
          <span className="space-y-2 ">
            <p className="text-sm text-blue-600">PATIENT</p>
            <h1 className="font-bold text-lg">Patient's name</h1>
          </span>
          <span>
            <Button className="bg-blue-600 text-white" type="button">
              Message
            </Button>
          </span>
        </Card>
        <div className="gap-1 flex flex-col overflow-y-auto menu flex-1">
          <Contact />
          <Lifestyle_Families />
          <MedicalHistory />
          <Medications />
          <LaboratoryResults />
        </div>
        <footer className="bg-white h-[5%] max-h-10 flex items-center gap-1 rounded-md">
          <Link href={"/user-management"}>
            <ArrowLeftCircleIcon className="relative bg-blue-500 text-white rounded-[999px] gap-1 cursor-pointer " />
          </Link>
          <p className="text-blue-500 underline hover:text-blue-700 text-sm">
            all users
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GetUserById;
