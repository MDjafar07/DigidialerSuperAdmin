import express from "express";
import { getKycFormController, getKycStatusController, verifyKycController } from "../controllers/kyc.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const kycRouter = express.Router();
kycRouter.get("/details/:company_id",getKycFormController);
kycRouter.get("/status/:company_id",getKycStatusController);
kycRouter.put("/verify/:company_id",authenticate,verifyKycController);

export default kycRouter;