import { Router } from "express";
import { doctorRegistration } from "../controllers/userControllers";
import { authenticate } from "../middlewares/auth";
import {
  doctorFormValidationRules,
  validateDoctorForm,
} from "../middlewares/validateForms";
// import { authenticate, verifyToken } from "../middlewares/auth";

const userRouter = Router();

userRouter
  .route("/doctor-registration")
  .post(
    authenticate,
    doctorFormValidationRules(),
    validateDoctorForm,
    doctorRegistration
  );

export default userRouter;
