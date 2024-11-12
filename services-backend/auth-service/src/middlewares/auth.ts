import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../database/dbConfig";
import { decodedType } from "..";

const verifyToken = async (req: Request, res: Response) => {
  const key = process.env.SECRET_KEY as string;
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ auth: "Not authorized" });
  }

  try {
    const decoded: decodedType = jwt.verify(token, key) as decodedType;

    if (decoded) {
      const findUser = await db.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });

      if (findUser) {
        if (decoded.isLoggedIn) {
          const user: decodedType = {
            userId: findUser.id as string,
            username: findUser.username,
            role: findUser.role,
          };
          res.status(200).json(user);
        } else {
          return res.status(401).json({ auth: "user not logged in" });
        }
      } else {
        res.status(401).json({ auth: "user not found" });
      }
    } else {
      res.status(401).json({ auth: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
    const findUser = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (findUser) {
      if (decoded.isLoggedIn) {
        const user: decodedType = {
          userId: findUser.id as string,
          username: findUser.username,
          role: findUser.role,
        };
        req.user = user;
      } else {
        return res.status(401).json({ auth: "user not logged in" });
      }

      next();
    } else {
      res.status(401).json({ auth: "user not found" });
    }
  } else {
    res.status(401).json({ auth: "Not authorized" });
  }
};

const loginMiddleware = async (
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
    const findUser = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (findUser) {
      const user: decodedType = {
        userId: findUser.id as string,
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

const handleAuthForServices = async (req: Request, res: Response) => {
  const { id, isLoggedIn } = req.body;

  if (!id) {
    return res.status(401).json({ auth: "Not authorized" });
  }

  try {
    const findUser = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (findUser) {
      if (isLoggedIn) {
        const user: decodedType = {
          userId: findUser.id as string,
          username: findUser.username,
          role: findUser.role,
        };
        res.status(200).json(user);
      } else {
        return res.status(401).json({ auth: "user not logged in" });
      }
    } else {
      res.status(401).json({ auth: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { verifyToken, authenticate, loginMiddleware, handleAuthForServices };
