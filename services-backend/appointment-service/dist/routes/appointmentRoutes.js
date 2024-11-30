import { Router } from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
} from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/auth.js";
const appointmentRouter = Router();
appointmentRouter
  .route("/create-appointment")
  .post(authenticate, createAppointment);
appointmentRouter
  .route("/update-appointment/:id")
  .put(authenticate, updateAppointment);
appointmentRouter.route("/get-appointments").get(authenticate, getAppointments);
export default appointmentRouter;
