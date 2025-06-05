"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { Linkedin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useGetUserByIdQuery } from "@/app/redux/services/users";
import { useParams } from "next/navigation";

export const socialsClassname =
  "flex flex-row gap-1 items-end hover:text-blue-600 cursor-pointer";

const GetDocById = () => {
  const params = useParams();

  const userId = params.id;

  const { data, isError, isLoading } = useGetUserByIdQuery(userId as String);

  useEffect(() => {
    data && !isError && console.log(data);
  }, [data, isError]);

  const doctorContact = {
    Fullname: "John Doe",
    Email: "johndoe@gmail.com",
    Phone: "0000 0000 0000",
    Address: "A nice place",
    canHelpWith: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Rosacea",
      "Skin infections",
      "Dermatitis",
      "Skin cancer",
      "Moles and warts",
      "Hair loss (alopecia)",
      "Hyperpigmentation",
    ],
  };
  return (
    data && (
      <div className="h-[90%] px-1 flex gap-1">
        <div className="flex flex-col justify-center gap-2 items-center h-full text-gray-600 p-3 px-7">
          <div className="h-64 w-56 rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile image"
            />
          </div>
          <h1 className="font-bold text-lg">Anthony Joshua</h1>
          <p className="text-xs">Dermatologist</p>
          <span className="flex text-sm gap-1">
            <h1 className="font-bold">Practice:</h1>
            <p>7 years</p>
          </span>
          <span className=" flex ">
            <ul className="flex gap-1">
              {Array.from({ length: 5 }).map(() => (
                <li className="text-yellow-500 text-sm">★</li>
              ))}
            </ul>
            <p className="font-bold text-sm">(4.9)</p>
            <p className="text-sm">165 reviews</p>
          </span>
          <p className="text-xs">1000 consultations fulfilled</p>
          <Button className="mt-3">
            <Link
              href={`/appointments/doctors/${data.id}/${data.username}/book`}
            >
              Book
            </Link>
          </Button>
        </div>
        <div className="overflow-y-auto menu">
          <div className="text-xs p-3 flex flex-col gap-3 leading-8 text-gray-600">
            <h1 className="font-bold">
              Hello, I am Dr. Sarah Thompson, a board-certified dermatologist
              with over 12 years of experience in providing comprehensive skin
              care solutions.
            </h1>
            <p>
              I specialize in diagnosing and treating a wide range of skin
              conditions, from acne and eczema to more complex issues like
              psoriasis and skin cancer. After completing my medical degree at
              Harvard Medical School, I pursued specialized training in
              dermatology and advanced cosmetic procedures. Throughout my
              career, I've had the privilege of helping thousands of patients
              achieve healthier, clearer skin by using a combination of medical
              treatments and minimally invasive procedures.
            </p>
            <p>
              In addition to my clinical work, I am an advocate for skin cancer
              awareness and regularly participate in community outreach programs
              to educate the public on the importance of sun protection.
            </p>
            <ul>
              <h1>I can help if you have:</h1>
              {doctorContact.canHelpWith.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
            <h1 className="font-bold">
              I look forward to meeting you and helping you achieve your skin
              health goals!
            </h1>
            <ul className="mx-auto flex gap-3 mt-5">
              <li className={`${socialsClassname}`}>
                <Linkedin size={20} /> <p className="h-5">LinkedIn</p>
              </li>
              <li className={`${socialsClassname}`}>
                <FaInstagram size={20} /> <p className="h-5">Instagram</p>
              </li>
              <li className={`${socialsClassname}`}>
                <FaFacebook size={20} /> <p className="h-5">Facebook</p>
              </li>
              <li className={`${socialsClassname}`}>
                <FaYoutube size={20} /> <p className="h-5">Youtube</p>
              </li>
              <li className={`${socialsClassname}`}>
                <FaTwitter size={20} /> <p className="h-5">Twitter</p>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              {Object.entries(doctorContact).map(([key, value]) => (
                <li key={key}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default GetDocById;
