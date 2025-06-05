import { Router } from "express";
import { test } from "../controllers/testController.js";
import { authenticate } from "../middlewares/auth.js";
const testRoute = Router();
testRoute.route("/test").get(authenticate, test);
export default testRoute;
