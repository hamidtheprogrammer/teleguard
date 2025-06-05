import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { decodedType, Role } from "..";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = process.env.SECRET_KEY as string;
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ auth: "Not authorized" });
  }

  const decoded = jwt.verify(token, key) as decodedType;

  if (decoded) {
    if (!decoded.isLoggedIn)
      return res.status(401).json({ message: "User not logged in" });

    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/get-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: decoded.userId,
        isLoggedIn: decoded.isLoggedIn,
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const findUser: { id: string; username: string; role: Role } =
      await response.json();

    if (findUser) {
      const user: decodedType = {
        userId: decoded.userId as string,
        username: findUser.username,
        role: findUser.role,
      };
      req.user = user;

      next();
    } else {
      res.status(401).json({ auth: "user not found" });
    }
  } else {
    res.status(401).json({ auth: "Not authorized" });
  }
};

export { authenticate };
