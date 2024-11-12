import { db } from "../database/dbConfig";

const refreshOTP = async (userId: string, type: string) => {
  try {
    if (type === "VERIFY") {
      await db.user.update({
        where: { id: userId },
        data: {
          verificationToken: "123123",
          verificationTokenExpiry: new Date(Date.now() + 3600000),
        },
        select: { id: true },
      });
    } else if (type === "PASSWORD") {
      await db.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: "123123",
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
        select: { id: true },
      });
    } else if (type === "LOGIN") {
      await db.user.update({
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
};

export default refreshOTP;
