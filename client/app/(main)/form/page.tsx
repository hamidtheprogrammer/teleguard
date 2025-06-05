"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import PatientForm from "./patientForm";
import { DoctorForm } from "./DoctorForm";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const page = () => {
  const [isSubmittedSuccessful, setIsSubmittedSuccessful] =
    useState<boolean>(false);
  enum currentFormType {
    PATIENT = "patient-form",
    DOCTOR = "doctor-form",
  }
  const currentUsername = useSelector((state: any) => state.auth.username);
  const [currentForm, setCurrentForm] = useState<currentFormType>(
    currentFormType.DOCTOR
  );

  if (isSubmittedSuccessful)
    return (
      <div className="px-1 overflow-y-auto menu">
        <Card className="flex justify-center items-center flex-col">
          <CardHeader>Registration successful!</CardHeader>
          <p>We will get back, soon</p>
        </Card>
      </div>
    );

  return (
    <div className="px-1 overflow-y-auto menu">
      <Card className="">
        <CardHeader>
          <CardTitle>Welcome, {currentUsername}</CardTitle>
          <CardDescription>Please, fill in the form below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-7">
            <Button
              onClick={() => {
                setCurrentForm(currentFormType.PATIENT);
              }}
              className={`${
                currentForm === currentFormType.PATIENT
                  ? "bg-blue-500"
                  : "bg-white text-black"
              } rounded`}
            >
              patient
            </Button>
            <Button
              onClick={() => {
                setCurrentForm(currentFormType.DOCTOR);
              }}
              className={`${
                currentForm === currentFormType.DOCTOR
                  ? "bg-blue-500"
                  : "bg-white text-black"
              } rounded`}
            >
              doctor
            </Button>
          </div>
          {currentForm === currentFormType.PATIENT ? (
            <PatientForm />
          ) : (
            <DoctorForm
              displaySuccessPage={() => {
                setIsSubmittedSuccessful(true);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
