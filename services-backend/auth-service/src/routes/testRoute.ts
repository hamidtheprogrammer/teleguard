import { Router } from "express";
import { test } from "../controllers/testController";

const testRoute = Router();

testRoute.route("/test").get(test);

export default testRoute;
