import { Router } from "express";
import {
  deleteCurrentUserProfile,
  getCurrentUserProfile,
  loginUser,
  logout,
  registerUser,
  sendOtp,
  updateCurrentUserProfile,
  verifyOtp,
} from "../controllers/userControllers";
import { validate, validationRules } from "../middlewares/validateUser";
import {
  authenticate,
  handleAuthForServices,
  loginMiddleware,
  verifyToken,
} from "../middlewares/auth";
// import { authenticate, verifyToken } from "../middlewares/auth";

const userRouter = Router();

userRouter.route("/register").post(validationRules({}), validate, registerUser);
userRouter.route("/verify-otp").post(loginMiddleware, verifyOtp);
userRouter.route("/send-otp").post(authenticate, sendOtp);
userRouter
  .route("/login")
  .post(validationRules({ login: true }), validate, loginUser);
userRouter.route("/verify-token").get(verifyToken);
userRouter.route("/get-auth").post(handleAuthForServices);
// userRouter.route("/get-profile").get(authenticate, getCurrentUserProfile);
// userRouter
//   .route("/update-profile")
//   .post(
//     authenticate,
//     validationRules({ updateProfile: true }),
//     validate,
//     updateCurrentUserProfile
//   );
// userRouter.route("/delete-profile").get(authenticate, deleteCurrentUserProfile);
userRouter.route("/logout").post(logout);

export default userRouter;