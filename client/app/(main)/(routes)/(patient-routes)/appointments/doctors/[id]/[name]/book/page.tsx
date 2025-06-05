"use client";
import React, { useEffect, useState } from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateAppointmentMutation } from "@/app/redux/services/appointment";
import { AppointmentPayload } from "@/app/types/appointmentTypes";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const BookAppointment = () => {
  const [complaint, setComplaint] = useState<String>("");
  const [date, setDate] = useState<Date>();

  const params = useParams();

  const router = useRouter();

  const userId = params.id;

  const [book, { isLoading, error, isSuccess }] =
    useCreateAppointmentMutation();

  const currentUser = useSelector((state: any) => state.auth);

  async function onSubmit(appointmentData: AppointmentPayload, e: any) {
    e.preventDefault();
    try {
      const res = await book(appointmentData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isSuccess && router.push("/appointments/success");
  }, [isSuccess]);

  return (
    <div className="h-[90%] px-1 ">
      <div className="h-full p-3 text-gray-600 ">
        <Avatar className="h-48 w-48">
          <AvatarImage
            className="object-cover object-top"
            src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></AvatarImage>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <CardHeader>
          <CardTitle>Dr. {params.name}</CardTitle>
          <CardDescription>Book a session with {params.name}</CardDescription>
        </CardHeader>
        <form
          action=""
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            onSubmit(
              {
                docInfo: {
                  id: userId as string,
                  name: `DR.${params.name}`,
                },
                patientInfo: {
                  id: currentUser.userId,
                  name: currentUser.username,
                },
                patientComplaint: complaint as string,
                date: date,
              },
              e
            );
          }}
        >
          <div className="relative w-1/2">
            <input
              className="pl-10 pr-4 py-2  border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-black/75"
              type="date"
              value={date}
              onChange={(e: any) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-5">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your reason for appointment</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                value={complaint as String}
                onChange={(e: any) => {
                  setComplaint(e.target.value);
                }}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Comments</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
