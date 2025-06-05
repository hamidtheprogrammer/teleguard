import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute";
import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { JwtPayload } from "jsonwebtoken";
import adminRouter from "./routes/adminRoutes";
import { db } from "./database/dbConfig";

dotenv.config();
const app = express();

export interface decodedType extends JwtPayload {
  userId: string;
  username: string;
  role: Role;
}

export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  USER = "USER",
}

declare global {
  namespace Express {
    interface Request {
      user: decodedType;
    }
  }
}

const count = 9;

if (count < 1) {
  const patientData = await db.patient.create({
    data: {
      DOB: new Date("1990-06-15"),
      gender: "Male",
      address: "123 Main St, Springfield, USA",
      ethnicity: "Caucasian",
      language: "English",
    },
  });

  const medicalHistoryData = await db.medicalHistory.create({
    data: {
      patientId: patientData.id,
      diagnoses: ["Asthma"],
      surgeries: {
        create: [{ type: "Tonsillectomy", date: new Date("2005-08-14") }],
      },
      allergies: ["Latex"],
      immunizations: {
        create: [{ name: "MMR", date: new Date("2002-04-12") }],
      },
    },
  });

  const surgeryData = await db.surgery.create({
    data: {
      medicalHistoryId: medicalHistoryData.id,
      type: "Gallbladder Removal",
      date: new Date("2018-09-20"),
    },
  });

  const immunizationData = await db.immunization.create({
    data: {
      medicalHistoryId: medicalHistoryData.id,
      name: "Tetanus Shot",
      date: new Date("2020-05-22"),
    },
  });

  const medicationData = await db.medications.create({
    data: {
      patientId: patientData.id,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      startDate: new Date("2021-08-01"),
      endDate: null,
    },
  });

  const labResultData = await db.labResults.create({
    data: {
      patientId: patientData.id,
      testName: "Hemoglobin A1C",
      result: "7.2%",
      unit: "%",
      referenceRange: "4.0-5.6",
      date: new Date("2023-07-10"),
    },
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(testRoute);
app.use(userRouter);
app.use(adminRouter);

app.listen(8100, () => {
  console.log("SERVER UP!!!");
});
