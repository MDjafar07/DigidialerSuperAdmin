import express from "express";
import { createPlanController, deletePlanController, getAllPlanController, getPlanByIdController, updatePlanController } from "../controllers/plan.controller.js";

const planRouter=express.Router();

planRouter.post('/create', createPlanController);
planRouter.get('/all', getAllPlanController);
planRouter.get('/:id', getPlanByIdController);
planRouter.patch('/:id', updatePlanController);
planRouter.delete('/:id', deletePlanController);

export default planRouter;