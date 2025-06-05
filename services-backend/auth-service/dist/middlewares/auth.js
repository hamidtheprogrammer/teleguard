var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import jwt from "jsonwebtoken";
import { db } from "../database/dbConfig.js";
import { decrypt } from "../utils/encryptData.js";
// import NodeCache from "node-cache";
// const cache = new NodeCache();
const verifyToken = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const key = process.env.SECRET_KEY;
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ auth: "Not authorized" });
    }
    try {
      const decoded = jwt.verify(token, key);
      if (decoded) {
        const findUser = yield db.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            username: true,
            role: true,
          },
        });
        if (findUser) {
          if (decoded.isLoggedIn) {
            const user = {
              userId: findUser.id,
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
  });
const authenticate = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      const key = process.env.SECRET_KEY;
      const token =
        (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
      // Check if token is present
      if (!token) {
        return res.status(401).json({ auth: "Not authorized" });
      }
      // Verify JWT
      const decoded = jwt.verify(token, key);
      // Check if user info is in cache
      // const cachedUser = cache.get(decoded.userId);
      // if (cachedUser) {
      //   // Attach cached user to request
      //   req.user = cachedUser as decodedType;
      //   return next();
      // }
      // Fetch user from the database
      const user = yield db.user.findUnique({
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
      const authenticatedUser = {
        userId: user.id,
        username: decrypt(user.username),
        role: user.role,
      };
      req.user = authenticatedUser;
      // Cache the user data
      // cache.set(authenticatedUser.userId, authenticatedUser, 600);
      // Proceed to next middleware
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ auth: "Invalid or expired token" });
    }
  });
const loginMiddleware = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const key = process.env.SECRET_KEY;
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ auth: "Not authorized" });
    }
    const decoded = jwt.verify(token, key);
    if (decoded) {
      const findUser = yield db.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
      if (findUser) {
        const user = {
          userId: findUser.id,
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
  });
const handleAuthForServices = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, isLoggedIn } = req.body;
    if (!id) {
      return res.status(401).json({ auth: "Not authorized" });
    }
    try {
      const findUser = yield db.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
      if (findUser) {
        if (isLoggedIn) {
          const user = {
            userId: findUser.id,
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
  });
export { verifyToken, authenticate, loginMiddleware, handleAuthForServices };
