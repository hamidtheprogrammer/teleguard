import React from "react";
import { headingStyles, unorderedListStyles } from "./Lifestyle&Families";
import { Card } from "../ui/card";

const MedicalHistory = () => {
  return (
    <div className="space-y-1 text-xs font-bold">
      <Card className={`${headingStyles} text-center`}>Medical history</Card>
      <div className="flex flex-row gap-1">
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Diagnoses</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Appendectomy (2010)</li>
            <li>Knee Arthroscopy (2020)</li>
          </ul>
        </Card>
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Surgeries</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Penicillin (causes rash)</li>
          </ul>
        </Card>
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Allergies & Immunitions</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Hypertension (diagnosed in 2015)</li>
            <li>Type 2 Diabetes (diagnosed in 2017)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default MedicalHistory;
