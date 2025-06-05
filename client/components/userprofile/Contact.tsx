import React from "react";
import Image from "next/image";
import { MenuSquareIcon } from "lucide-react";
import { Card } from "../ui/card";

const Contact = () => {
  return (
    <Card className="flex justify-between items-center h-36 rounded-md p-4 bg-white text-xs font-bold">
      <span className="h-full flex gap-3">
        <Image
          alt="user image"
          src="/assets/kevin hart.avif"
          width={150}
          height={150}
          className="h-full object-cover object-top rounded-md"
        />
        <ul className="flex flex-col justify-between">
          <li>Title:</li>
          <li>Joined:</li>
          <li>Email:</li>
          <li>Telephone:</li>
        </ul>
      </span>
      <span className="h-full">
        <ul className="flex flex-col justify-between h-full">
          <li>Mr</li>
          <li>16/20/2024</li>
          <li>patient@gmail.com</li>
          <li>0000 0000 0000</li>
        </ul>
      </span>
      <span className="h-full">
        <MenuSquareIcon className="text-gray-500 cursor-pointer hover:text-black" />
      </span>
    </Card>
  );
};

export default Contact;
