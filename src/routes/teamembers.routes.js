import express from "express";
import { addTeamMemberController, deleteMemberController, getTeamMembersController } from "../controllers/teammember.controller.js";


const teamMemberRouter = express.Router();

// Add a member to a team
teamMemberRouter.post("/team-members", addTeamMemberController);

// List members of a team
teamMemberRouter.delete("/delete/:teamId/:userId",deleteMemberController);
teamMemberRouter.get("/:team_id", getTeamMembersController);

export default teamMemberRouter;
