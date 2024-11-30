import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
export var Role;
(function (Role) {
  Role["ADMIN"] = "ADMIN";
  Role["DOCTOR"] = "DOCTOR";
  Role["PATIENT"] = "PATIENT";
  Role["USER"] = "USER";
})(Role || (Role = {}));
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
const port = process.env.PORT || 8500;
app.use(testRouter);
app.use(appointmentRouter);
app.listen(port, () => {
  console.log("server running on " + port);
});
