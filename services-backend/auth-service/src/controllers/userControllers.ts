import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken";
import { db } from "../database/dbConfig";
import refreshOTP from "../utils/refreshToken";
import {
  LogAttempt,
  LogDetails,
  LogStatus,
  saveAuthLog,
} from "../utils/authLogs";
import { encrypt, decrypt } from "../utils/encryptData";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;

  try {
    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ email: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        username: encrypt(username),
        email: encrypt(email),
        password: hashedPassword,
        phone: encrypt(phone),
        role: "USER",
        verified: true,
      },
    });

    if (newUser) {
      refreshOTP(newUser.id, "VERIFY");
      createToken({ res, userId: newUser.id, isLoggedIn: false });
      res.status(200).json({ newUser });
    } else {
      res
        .status(500)
        .send("An unexpected server error occured. Please try again");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const { otp, type, password } = req.body;
  const { userId } = req.user;
  const { username } = req.user;
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        verificationToken: true,
        verificationTokenExpiry: true,
        forgotPasswordToken: true,
        forgotPasswordTokenExpiry: true,
        loginToken: true,
        loginTokenExpiry: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (type === "PASSWORD") {
      if (
        user.forgotPasswordTokenExpiry &&
        user.forgotPasswordTokenExpiry < new Date(Date.now())
      )
        return res
          .status(400)
          .json({ message: "Token expired. Pls resend OTP" });

      if (!password || password.split("").length <= 8)
        return res.status(400).json({ message: "Invalid password" });

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      if (otp === user?.forgotPasswordToken) {
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: {
            forgotPasswordToken: null,
            forgotPasswordTokenExpiry: null,
            password: hashedPassword,
          },
          select: {
            id: true,
            username: true,
          },
        });

        if (!updatedUser)
          return res.status(400).json({ message: "Password update failed" });

        res.status(200).json(updatedUser);
      } else {
        return res.status(400).json({ message: "Invalid token" });
      }
    } else if (type === "VERIFY") {
      if (
        user.verificationTokenExpiry &&
        user.verificationTokenExpiry < new Date(Date.now())
      )
        return res
          .status(400)
          .json({ message: "Token expired. Pls resend OTP" });

      if (otp === user?.verificationToken) {
        const verifiedUser = await db.user.update({
          where: { id: userId },
          data: {
            verified: true,
            verificationToken: null,
            verificationTokenExpiry: null,
          },
          select: {
            id: true,
            username: true,
            verified: true,
          },
        });

        if (!verifiedUser)
          return res.status(400).json({ message: "User verification failed" });

        createToken({ res, userId, isLoggedIn: true });
        res.status(200).json(verifiedUser);
        const newLog = {
          user: verifiedUser.username,
          action: LogAttempt.REGISTER,
          details: LogDetails.SUCCESS_REGISTER,
          ipAddress: "192.168.1.1",
          status: LogStatus.SUCCESS,
        };
      } else {
        return res.status(400).json({ message: "Invalid token" });
      }
    } else if (type === "LOGIN") {
      if (user.loginTokenExpiry && user.loginTokenExpiry < new Date(Date.now()))
        return res
          .status(400)
          .json({ message: "Token expired. Pls resend OTP" });

      if (otp === user?.loginToken) {
        createToken({ res, userId, isLoggedIn: true });
        res.status(200).json({ messsage: "verification successful" });
      } else {
        return res.status(400).json({ message: "Invalid token" });
      }
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

const sendOtp = async (req: Request, res: Response) => {
  const { type } = req.body;
  const { userId } = req.user;
  await refreshOTP(userId, type);
  res.status(200).json({ message: "Token refreshed" });
};

const loginUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  email = encrypt(email);
  try {
    const user = await db.user.findFirst({
      where: { email: email },
      select: { id: true, username: true, password: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ password: "incorrect password" });
    }

    // refreshOTP(user.id, "LOGIN");
    createToken({ res, userId: user.id as string, isLoggedIn: false });
    user.username = decrypt(user.username);
    res.status(200).json({
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const profile = await db.user.findUnique({
      where: { id: req.user.userId as string },
    });

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(401).json({ profile: "Could not get profile" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCurrentUserProfile = async (req: Request, res: Response) => {
  const newProfile = req.body;

  if (newProfile.password) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newProfile.password, salt);

    newProfile.password = hashedPassword;
  }
  try {
    // const updatedProfile = await db.user.update({
    //   where: { id: req.user.userId },
    //   data: { newProfile },
    // });
    // if (updatedProfile) {
    //   res.status(200).json(updatedProfile);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    await db.user.delete({ where: { id: req.user.userId as string } });

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    maxAge: 0, // Immediately expire the cookie
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });

  res.status(200).json({ message: "Logout successful" });
};

// const newLog = {
//   user: username,
//   action: LogAttempt.LOGIN,
//   details: LogDetails.SUCCESS_LOGIN,
//   ipAddress: "192.168.1.1",
//   status: LogStatus.SUCCESS,
// };
// await saveAuthLog(newLog);

export {
  registerUser,
  verifyOtp,
  sendOtp,
  loginUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
  logout,
};
