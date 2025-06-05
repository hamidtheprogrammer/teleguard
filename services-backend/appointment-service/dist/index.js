import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import NodeCache from "node-cache";
export const authCache = new NodeCache();
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
const user = {
  userId: "66d800f0cefda96d4db8cb33",
  username: "0930159950f090a09c2483d08686efdc",
  role: "DOCTOR",
};

authCache.set(user.userId, user, 600);
const port = process.env.PORT || 8500;
app.use(testRouter);
app.use(appointmentRouter);
app.listen(port, () => {
  console.log("server running on " + port);
});
