import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken";
import { db } from "../database/dbConfig";
import refreshToken from "../utils/refreshToken";

const doctorRegistration = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const regData = req.body;

  console.log(regData);
  res.status(200).json({ message: "Registration successful" });
};

export { doctorRegistration };
