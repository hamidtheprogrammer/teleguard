"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Timer, Calendar, TriangleAlert, Check, X } from "lucide-react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "@/app/redux/services/appointment";
import {
  AppointmentPayload,
  UpdateAppointmentPayload,
} from "@/app/types/appointmentTypes";
import { useSelector } from "react-redux";
import { Role } from "@/app/types/userTypes";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDateToYMD } from "@/lib/utils";
import Link from "next/link";
import Pagination from "./pagination";

const cardStyles =
  "rounded-lg w-[25%] h-full flex justify-center text-white flex-col gap-3 pl-4";

const innerCardStyles = "flex flex-row gap-3 text-4xl font-bold items-center";

const appointInfoStyles = "flex flex-col gap-1 ";

const ManageAppointments = () => {
  const { data } = useGetAppointmentsQuery("");

  const [updateAppointment, { data: results, isLoading }] =
    useUpdateAppointmentMutation();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  const [updateAppointmentDetails, setUpdateAppointmentDetails] =
    useState<UpdateAppointmentPayload>({
      id: "",
      status: "PENDING",
      doctorComment: "",
    });

  async function onSubmit(values: UpdateAppointmentPayload) {
    try {
      const res = await updateAppointment(values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const [currentAppointment, setCurrentAppointment] = useState<any>({
    patient: "",
    doctor: "",
    date: "",
    status: "",
    complaint: "",
    doctorComment: "",
  });

  const currentUser = useSelector((state: any) => state.auth);

  const setCurrentAppointmentInfo = (appointment: AppointmentPayload) => {
    setCurrentAppointment({
      patient: appointment.patientInfo.name,
      doctor: appointment.docInfo.name,
      date: appointment.date,
      status: appointment.status,
      complaint: appointment.patientComplaint,
      doctorComment: appointment.doctorComment,
    });

    setUpdateAppointmentDetails({
      id: appointment.id as string,
      status: appointment.status,
      doctorComment: appointment.doctorComment,
    });
  };

  return (
    <div className="pl-1 h-full">
      {isInfoModalOpen && (
        <div className="fixed inset-0 w-full h-full bg-black/40 flex justify-center items-center gap-3 z-50">
          <Card className="h-[80%] bg-white w-[50%] rounded-lg overflow-y-auto menu">
            <CardHeader>
              <CardTitle>Appointment info</CardTitle>
              <CardDescription>Review your appointment :)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Patient</h1>
                <p className="text-sm w-full border-[1px] rounded-sm p-2">
                  {currentAppointment.patient}
                </p>
              </div>
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Doctor</h1>
                <p className="text-sm w-full border-[1px] rounded-sm p-2">
                  {currentAppointment.doctor}
                </p>
              </div>
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Date</h1>
                <p className="text-sm w-full border-[1px] rounded-sm p-2">
                  {"2024-11-09"}
                </p>
              </div>
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Status</h1>
                <div className="text-sm w-full border-[1px] rounded-sm p-2">
                  {currentUser.role === Role.DOCTOR ? (
                    <select
                      name="status"
                      id=""
                      value={updateAppointmentDetails.status}
                      onChange={(e: any) => {
                        setUpdateAppointmentDetails((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }));
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="DECLINED">DECLINED</option>
                    </select>
                  ) : (
                    <p>{currentAppointment.status}</p>
                  )}
                </div>
              </div>
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Complaint</h1>
                <p className="text-sm w-full border-[1px] rounded-sm p-2">
                  {currentAppointment.complaint}
                </p>
              </div>
              <div className={`${appointInfoStyles}`}>
                <h1 className="font-bold">Doctor's comment</h1>
                <div className="text-sm w-full border-[1px] rounded-sm p-2">
                  {currentUser.role === Role.DOCTOR ? (
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      value={updateAppointmentDetails.doctorComment}
                      onChange={(e: any) => {
                        setUpdateAppointmentDetails((prev) => ({
                          ...prev,
                          doctorComment: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <p>{currentAppointment.doctorComment}</p>
                  )}
                </div>
              </div>
              {currentUser.role === Role.DOCTOR && (
                <CardFooter>
                  <Button
                    onClick={() => {
                      onSubmit(updateAppointmentDetails);
                    }}
                    className="w-full mt-5"
                  >
                    {isLoading ? "Updating" : "Update"}
                  </Button>
                </CardFooter>
              )}
            </CardContent>
          </Card>
          <p
            onClick={() => setIsInfoModalOpen(false)}
            className="text-xl border-[2px] rounded-full h-7 w-7 cursor-pointer flex justify-center items-center self-start mt-[10%] text-gray-200"
          >
            X
          </p>
        </div>
      )}
      <Card className="h-full w-full flex flex-col">
        <div className="h-[30%] w-full flex justify-between px-2 my-2">
          <Card className={`${cardStyles} bg-blue-400`}>
            <div className={`${innerCardStyles}`}>
              <Calendar size={30} />
              <h1>108</h1>
            </div>
            <div>Scheduled appointments</div>
          </Card>
          <Card className={`${cardStyles} bg-yellow-400`}>
            <div className={`${innerCardStyles}`}>
              <Timer size={30} />
              <h1>2</h1>
            </div>
            <div>Pending appointments</div>
          </Card>
          <Card className={`${cardStyles} bg-red-400`}>
            <div className={`${innerCardStyles}`}>
              <TriangleAlert size={30} />
              <h1>10</h1>
            </div>
            <div>Cancelled appointments</div>
          </Card>
        </div>
        <Card className="flex flex-col h-[70%] px-3">
          <header className="flex flex-row border-b-[1px] text-blue-500 text-sm py-2">
            <span className="flex-1">Patient</span>
            <span className="flex-1">Status</span>
            <span className="flex-1">Date</span>
            <span className="flex-1">Doctor</span>
            <span className="flex-1">Options</span>
          </header>
          <ul className="flex flex-col h-[70%] overflow-y-auto menu relative">
            {data &&
              data.length &&
              data.map((appointment: AppointmentPayload, idx: number) => (
                <li
                  className={`flex flex-row items-center border-b-[1px] text-xs py-3 ${
                    idx % 2 === 1 && "bg-gray-100"
                  }`}
                >
                  <span className="flex-1 flex gap-1 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn" />
                      <AvatarFallback>
                        {appointment.patientInfo.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    {appointment.patientInfo.name}
                  </span>
                  <span className="flex-1">
                    <p
                      className={`flex gap-1 items-center  font-bold ${
                        appointment.status === "APPROVED"
                          ? "bg-green-200"
                          : appointment.status === "PENDING"
                          ? "bg-yellow-200"
                          : appointment.status === "DECLINED" && "bg-red-200"
                      } text-green-800 text-[0.7rem] w-fit rounded-full px-2`}
                    >
                      <p>{appointment.status}</p>
                      {appointment.status === "APPROVED" ? (
                        <Check size={13} fontWeight={20} />
                      ) : appointment.status === "PENDING" ? (
                        <Timer size={13} fontWeight={20} />
                      ) : (
                        appointment.status === "DECLINED" && (
                          <X size={13} fontWeight={20} />
                        )
                      )}
                    </p>
                  </span>
                  <p className="flex-1">{formatDateToYMD(appointment.date)}</p>
                  <span className="flex-1 flex gap-1 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn" />
                      <AvatarFallback>
                        {appointment.docInfo.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    {appointment.docInfo.name}
                  </span>
                  <p
                    className="flex-1 cursor-pointer underline hover:opacity-80 text-blue-600"
                    onClick={() => {
                      setIsInfoModalOpen(true);
                      setCurrentAppointmentInfo(appointment);
                    }}
                  >
                    {currentUser.role === Role.DOCTOR ? "Edit" : "View info"}
                  </p>
                </li>
              ))}
          </ul>
          <CardFooter className="flex justify-between items-center w-full h-fit py-1">
            <div className="flex items-center">
              <Pagination pageNumber={1} pages={5} changePage={() => {}} />
            </div>
            {currentUser.role === Role.PATIENT && (
              <span className="">
                <Button>
                  <Link href={"appointments/doctors"}>Book</Link>
                </Button>
              </span>
            )}
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
};

export default ManageAppointments;
