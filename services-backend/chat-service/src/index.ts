import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute";
import messageRouter from "./routes/messageRoutes";
import path from "path";
import { JwtPayload } from "jsonwebtoken";

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

const port = process.env.PORT || 3500;

app.use(testRouter);
app.use(messageRouter);

app.listen(port, () => {
  console.log("server running on " + port);
});
