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
import NodeCache from "node-cache";
const cache = new NodeCache();
const authenticate = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const key = process.env.SECRET_KEY;
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ auth: "Not authorized" });
    }
    const decoded = jwt.verify(token, key);
    if (!decoded || !decoded.isLoggedIn) {
      res.status(401).json({ auth: "Not authorized" });
    }
    // Check if user info is in cache
    const cachedUser = cache.get(decoded.userId);
    if (cachedUser) {
      // Attach cached user to request

      req.user = cachedUser;

      return next();
    }
    const response = yield fetch(`${process.env.AUTH_SERVICE_URL}/get-auth`, {
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
    const findUser = yield response.json();
    if (findUser) {
      const user = {
        userId: decoded.userId,
        username: findUser.username,
        role: findUser.role,
      };

      req.user = user;
      // Cache the user data
      cache.set(req.user.userId, req.user, 600);

      // Proceed to next middleware
      next();
    } else {
      res.status(401).json({ auth: "user not found" });
    }
  });
export { authenticate };
