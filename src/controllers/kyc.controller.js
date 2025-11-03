import { getAllKycList, getCompanyMobileByCompanyId, getKycByCompanyId, getKycStatus, verifyKycByCompanyId } from "../models/kyc.model.js";
import { sendSmsNotification } from "../utills/smsService.js";
import authenticate from "../middlewares/authenticate.middleware.js";

// Get KYC by company ID
// export async function getKycByIdController(req,res){
//     try {
//         const {company_Id} = req.params;
//         if(!company_Id || isNaN(company_Id)){
//             return res.status(400).json({message: "Invalid or missing company ID"});
//         }
//         const kyc = await getKycByCompanyId(company_Id);
//         if(!kyc){
//             return res.status(404).json({message: "KYC not found for this company ID"});
//         }
//         return res.status(200).json({
//             message: "KYC fetched successfully",
//             kyc,
//             success: true
//         })
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             message: error.message,
//             sucess: false
//         })
        
//     }
// }


// Get kyc details
export async function getAllKycListController(req,res){
    try {
        const kycList= await getAllKycList();
        return res.status(200).json({
            message: "Get All Kyc List ",
            success:true,
            kycList
        })

    } catch (error) {
        console.log("GetAllKyc",error.mesaage);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch All KYC List',
            error: error.message
        })
        
    }
}

// superAdmin: Get kyc form fields

export async function getKycFormController(req,res){
    try{
        const {company_id} = req.params;
        const kycData= await getKycByCompanyId(company_id);
        if(!kycData){
            return res.status(404).json({
                message:"No KYC found for this company.",
                sucess:false
            });
        }
        return res.status(200).json({
            message:"KYC form fields fetched",
            kycData,
            sucess:true
        })
    } catch(error){
        console.error('getFullKycDetailsController error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch full KYC details',
            error: error.message
    });
  }
}

//Get Kyc status
export async function getKycStatusController(req,res){
    try {
        const {company_id}= req.params;
  
        const kyc= await getKycStatus(company_id);

        if(!kyc){
            return res.status(404).json({
                message:"KYC not Found",
            });
        }
        res.status(200).json({
            message:"KYC status fetched",
            kyc,
            sucess:true
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:"Failed to fetch KYC status" || error.mesaage,
            sucess:false
        });
    }
}

//superAdmin KYC Approve/reject

export async function verifyKycController(req, res) {
    try {
        const company_id = parseInt(req.params.company_id);
        const { action} = req.body;

        if (!["approved", "rejected"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Invalid action. Must be 'approved' or 'rejected'."
            });
        }

        const status = action;
        const verified_by = req.user?.name;
        
        const updatedKyc = await verifyKycByCompanyId({ company_id, status, verified_by });

        if (!updatedKyc) {
            return res.status(404).json({
                message: "KYC not found",
                success: false
            });
        }

        const company = await getCompanyMobileByCompanyId(company_id);
        if (company?.mobile) {
            const message = `Dear ${company.name}, your KYC has been ${status.toUpperCase()} by ${req.user.name}.`;
            await sendSmsNotification(company.mobile, message);
        }
        
        return res.status(200).json({
            message: `KYC ${status} successfully`,
            updatedKyc,
            success: true
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Failed to verify KYC",
            success: false
        });
    }
}

