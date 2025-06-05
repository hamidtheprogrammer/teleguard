import { Router } from "express";
import { test } from "../controllers/testController";

const testRoute = Router();

testRoute.route("/").get(test);

export default testRoute;
