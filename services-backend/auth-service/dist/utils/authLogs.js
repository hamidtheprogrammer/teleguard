var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logServiceUrl = process.env.LOG_SERVICE_URL;
const SERVER_ERROR_LOG = "SERVER ERROR";
export var LogAttempt;
(function (LogAttempt) {
    LogAttempt["LOGIN"] = "LOGIN ATTEMPT";
    LogAttempt["REGISTER"] = "REGISTRATION ATTEMPT";
})(LogAttempt || (LogAttempt = {}));
export var LogStatus;
(function (LogStatus) {
    LogStatus["SUCCESS"] = "SUCCESS";
    LogStatus["FAILED"] = "FAILED";
})(LogStatus || (LogStatus = {}));
export var LogDetails;
(function (LogDetails) {
    LogDetails["SUCCESS_LOGIN"] = "SUCCESSFUL LOGIN";
    LogDetails["FAILED_LOGIN_EMAIL"] = "EMAIL NOT FOUND";
    LogDetails["FAILED_LOGIN_PASSWORD"] = "INCORRECT PASSWORD";
    LogDetails["SUCCESS_REGISTER"] = "SUCCESSFUL REGISTRATION";
    LogDetails["FAILED_REGISTER_EMAIL"] = "EMAIL ALREADY EXISTS";
})(LogDetails || (LogDetails = {}));
export const saveAuthLog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    try {
        yield fetch(`${logServiceUrl}/save-log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
    catch (error) {
        console.log(error);
    }
});
