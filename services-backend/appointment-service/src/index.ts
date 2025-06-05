import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute";
import appointmentRouter from "./routes/appointmentRoutes";
import path from "path";
import { JwtPayload } from "jsonwebtoken";
import { db } from "./database/dbConfig";
import { Appointment, AppointmentStatus } from "@prisma/client";

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

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

async function fillDB() {
  const preparedAppointments = [];

  for (let i = 2; i < 2; i++) {
    const data: Appointment = {
      docInfo: { id: "66d800f0cefda96d4db8cb33", name: "Dr.Hamid" },
      patientInfo: { id: "66d800f0cefda96d4db8cb33", name: "John" },
      status: AppointmentStatus.PENDING,
      doctorComment: "",
      patientComplaint: `Stomache ache${i}`,
    };
    preparedAppointments.push(data);
  }
  try {
    const count = await db.appointment.count();

    if (count > 30) {
      return;
    }
    const saved = await db.appointment.createMany({
      data: preparedAppointments,
    });
    console.log(saved);
  } catch (error) {
    console.log(error);
  }
}

const port = process.env.PORT || 8500;

app.use(testRouter);
app.use(appointmentRouter);

app.listen(port, () => {
  console.log("server running on " + port);
});
