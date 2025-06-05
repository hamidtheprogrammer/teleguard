import { Router } from "express";
import { test } from "../controllers/testController";
import { authenticate } from "../middlewares/auth";

const testRoute = Router();

testRoute.route("/test").get(authenticate, test);

export default testRoute;
