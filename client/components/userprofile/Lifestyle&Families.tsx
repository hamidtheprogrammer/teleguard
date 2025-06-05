import React from "react";
import { Card } from "../ui/card";

export const headingStyles =
  "font-bold bg-slate-200 p-1 rounded-md rounded-b-none text-sm";

export const unorderedListStyles = "flex flex-col gap-4 justify-between p-3";

const Lifestyle_Families = () => {
  const containerStyles = "flex-1 rounded-md bg-white ";
  return (
    <div className="flex flex-row gap-1 text-xs font-bold">
      <Card className={`${containerStyles} `}>
        <h1 className={headingStyles}>Lifestyle</h1>
        <span className="flex justify-between p-3">
          <ul className={`${unorderedListStyles}`}>
            <li>Alchohol:</li>
            <li>Smoke:</li>
            <li>Stress:</li>
            <li>Alchohol:</li>
            <li>Smoke:</li>
            <li>Stress:</li>
          </ul>
          <ul className={`${unorderedListStyles}`}>
            <li>None</li>
            <li>None</li>
            <li>7</li>
            <li>None</li>
            <li>None</li>
            <li>7</li>
          </ul>
        </span>
      </Card>
      <Card className={containerStyles}>
        <h1 className={headingStyles}>Families</h1>
        <span className="flex justify-between items-center p-3">
          <h2>Mother</h2>
          <ul className={unorderedListStyles}>
            <li>Title:</li>
            <li>Email:</li>
            <li>Telephone:</li>
          </ul>
          <ul className="flex flex-col justify-between h-full">
            <li>Mr</li>
            <li>patient@gmail.com</li>
            <li>0000 0000 0000</li>
          </ul>
        </span>
        <span className="flex justify-between items-center  p-4 bg-gray-100">
          <h2>Father</h2>
          <ul className={unorderedListStyles}>
            <li>Title:</li>
            <li>Email:</li>
            <li>Telephone:</li>
          </ul>
          <ul className="flex flex-col justify-between h-full">
            <li>Mr</li>
            <li>patient@gmail.com</li>
            <li>0000 0000 0000</li>
          </ul>
        </span>
      </Card>
    </div>
  );
};

export default Lifestyle_Families;
