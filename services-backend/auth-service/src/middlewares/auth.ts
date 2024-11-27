import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../database/dbConfig";
import { decodedType } from "..";
import { decrypt } from "../utils/encryptData";
import NodeCache from "node-cache";

const cache = new NodeCache();

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
            username: decrypt(findUser.username),
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
  try {
    const key = process.env.SECRET_KEY as string;
    const token = req.cookies?.jwt;

    // Check if token is present
    if (!token) {
      return res.status(401).json({ auth: "Not authorized" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, key) as decodedType;

    // Check if user info is in cache
    const cachedUser = cache.get(decoded.userId);
    if (cachedUser) {
      // Attach cached user to request
      req.user = cachedUser as decodedType;
      return next();
    }

    // Fetch user from the database
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ auth: "User not found" });
    }

    // Check if user is logged in
    if (!decoded.isLoggedIn) {
      return res.status(401).json({ auth: "User not logged in" });
    }

    // Decrypt username and set user in request object
    const authenticatedUser: decodedType = {
      userId: user.id,
      username: decrypt(user.username),
      role: user.role,
    };
    req.user = authenticatedUser;

    // Cache the user data
    cache.set(authenticatedUser.userId, authenticatedUser, 600);

    // Proceed to next middleware
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ auth: "Invalid or expired token" });
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
