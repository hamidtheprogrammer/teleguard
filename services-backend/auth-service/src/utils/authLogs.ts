const logServiceUrl = process.env.LOG_SERVICE_URL;

const SERVER_ERROR_LOG = "SERVER ERROR";

export enum LogAttempt {
  LOGIN = "LOGIN ATTEMPT",
  REGISTER = "REGISTRATION ATTEMPT",
}

export enum LogStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum LogDetails {
  SUCCESS_LOGIN = "SUCCESSFUL LOGIN",
  FAILED_LOGIN_EMAIL = "EMAIL NOT FOUND",
  FAILED_LOGIN_PASSWORD = "INCORRECT PASSWORD",

  SUCCESS_REGISTER = "SUCCESSFUL REGISTRATION",
  FAILED_REGISTER_EMAIL = "EMAIL ALREADY EXISTS",
}

interface Log {
  user: String;
  action: String;
  target?: String;
  details: String;
  ipAddress: String;
  status: LogStatus;
}

export const saveAuthLog = async (data: Log) => {
  console.log(data);

  try {
    await fetch(`${logServiceUrl}/save-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
