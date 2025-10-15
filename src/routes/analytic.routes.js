import express from "express";
import { getAnalyticsDataController } from "../controllers/analytic.controller.js";

const analyticRouter = express.Router();

analyticRouter.get("/", getAnalyticsDataController);

export default analyticRouter;
