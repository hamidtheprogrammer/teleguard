import jwt from "jsonwebtoken";
import { Response } from "express";

interface tokenProps {
  res: Response;
  userId: string;
  isLoggedIn: boolean;
}

const createToken = ({ res, userId, isLoggedIn }: tokenProps) => {
  const key = process.env.SECRET_KEY as string;

  const token = jwt.sign({ userId, isLoggedIn }, key, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 84000000,
  });
};

export default createToken;
