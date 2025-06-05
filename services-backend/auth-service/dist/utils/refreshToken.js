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
import { db } from "../database/dbConfig.js";
const refreshOTP = (userId, type) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (type === "VERIFY") {
        yield db.user.update({
          where: { id: userId },
          data: {
            verificationToken: "123123",
            verificationTokenExpiry: new Date(Date.now() + 3600000),
          },
          select: { id: true },
        });
      } else if (type === "PASSWORD") {
        yield db.user.update({
          where: { id: userId },
          data: {
            forgotPasswordToken: "123123",
            forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
          },
          select: { id: true },
        });
      } else if (type === "LOGIN") {
        yield db.user.update({
          where: { id: userId },
          data: {
            loginToken: "123123",
            loginTokenExpiry: new Date(Date.now() + 3600000),
          },
          select: { id: true },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
export default refreshOTP;
