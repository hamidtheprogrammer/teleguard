import React from "react";
import { headingStyles, unorderedListStyles } from "./Lifestyle&Families";
import { Card } from "../ui/card";

const LaboratoryResults = () => {
  return (
    <div className="space-y-1">
      <Card className={`${headingStyles} text-center`}>LaboratoryResults</Card>
      <div className="flex flex-row gap-1 text-xs font-bold">
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Blood tests </h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Hemoglobin A1c: 6.8% (elevated)(july,2023)</li>
            <li>Total Cholesterol: 210 mg/dL (borderline)</li>
            <li>LDL Cholesterol: 140 mg/dL (elevated)</li>
            <li>Fasting Glucose: 130 mg/dL (elevated)</li>
          </ul>
        </Card>
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Imaging Results</h1>
          <ul className={`${unorderedListStyles}`}>
            <li>X-ray (Knee, March 2020): Moderate osteoarthritis.</li>
          </ul>
        </Card>
        <Card className="flex-1">
          <h1 className={`${headingStyles}`}>Urine Analysis </h1>
          <ul className={`${unorderedListStyles}`}>
            <li>Protein: Trace</li>
            <li>Glucose: Positive</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default LaboratoryResults;
