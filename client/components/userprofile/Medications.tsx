import React from "react";
import { headingStyles, unorderedListStyles } from "./Lifestyle&Families";
import { Card } from "../ui/card";

const Medications = () => {
  return (
    <div className="space-y-1">
      <Card className={`${headingStyles} text-center`}>Medications</Card>
      <div className="flex flex-row gap-1 text-xs font-bold">
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Current medications</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Metformin 500 mg (twice daily)</li>
            <li>Lisinopril 10 mg (once daily)</li>
          </ul>
        </Card>
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Previous medications</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Atenolol 50 mg (discontinued in 2021)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Medications;
