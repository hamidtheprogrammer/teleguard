import { Router } from "express";
import { saveLog } from "../controllers/logController";

const logRouter = Router();

logRouter.route("/save-log").post(saveLog);

export default logRouter;
