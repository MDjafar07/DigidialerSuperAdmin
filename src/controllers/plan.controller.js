import { createPlanModel, deletePlan, getAllPlan, getPlanById, updatePlan } from "../models/plan.model.js";


//createPlan
export async function createPlanController(req, res) {
    try {
        const { name, price, call_limit, sms_limit, unlimited_calls, unlimited_sms, description } = req.body;
        if ([!name || !price || !call_limit || !sms_limit || !unlimited_calls || !unlimited_sms || !description].some(field => field === undefined || field === null)) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const plan = await createPlanModel({name, price, call_limit, sms_limit, unlimited_calls, unlimited_sms, description});
        res.status(200).json({
            message: 'Create Plans for Super Admin',
            success: true,
            plan
        });


    } catch (error) {
        console.error("❌ createPlan error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

//Get All Plans
export async function getAllPlanController(req, res) {
    try {
        const allPlan = await getAllPlan();
        if (!allPlan) {
            return res.status(404).json({
                message: "Not Get All Plans"
            })
        }
        res.status(200).json({
            message: "fetched all plans Succesfully",
            success: true,
            allPlan
        })

    } catch (error) {
        console.error("Get All plans error", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message

        })
    }
}

//Get plans by Id

export async function getPlanByIdController(req,res) {
    try {
        const { id } = req.params;
        const planById = await getPlanById(id);
        if (!planById) {
            return res.status(404).json({ message: "Id not found" });
        }
        res.status(200).json({
            message: "fetch plans By Id Successfull",
            success: true,
            planById
        });

    } catch (error) {
        console.error("Get All plans error", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

//plans update

export async function updatePlanController(req,res) {
    try {
        const { id } = req.params;
        const updateplans = await updatePlan(id, req.body);
        console.log(updatePlan);
        
        res.status(200).json({
            message: "Update Plan Successfully",
            success: true,
            updateplans
        })
    } catch (error) {
        console.error("Update plans error", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

//plan delete

export async function deletePlanController(req,res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid or missing plan ID" });
        }
        const deleteplans = await deletePlan(id);
        if (!deleteplans) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User deleted successfully",
            deleteplans,
            success: true
        });
    } catch (error) {
        console.error("Update plans error", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

