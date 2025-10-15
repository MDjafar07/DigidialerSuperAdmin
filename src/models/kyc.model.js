import pool from "../config/db.js";

//Get all KYC details
export async function getAllKycList(){
    const {rows} = await pool.query(
        `SELECT *FROM auths.company_kyc`
    );
    return rows;
}

// Get KYC by company ID
export async function getKycByCompanyId(company_id){

    const {rows} = await pool.query(
        `SELECT * FROM auths.company_kyc WHERE company_id = $1`,
        [company_id]
    );
    return rows[0];
}

//get kyc status by company ID
export async function getKycStatus(company_id){
    const {rows} = await pool.query(
        `SELECT company_name,company_address,status FROM auths.company_kyc WHERE company_id=$1`,
        [company_id]
    );
    return rows[0];
}
//verify kyc(approve/reject)

export async function verifyKycByCompanyId({company_id, status, verified_by}) {
    console.log("Updating DB with:", { company_id, status, verified_by });
    const { rows } = await pool.query(
        `UPDATE auths.company_kyc
         SET status=$1, verified_by=$2,verified_at=NOW()
         WHERE company_id=$3
         RETURNING *`,
        [status, verified_by, company_id]
    );
    return rows[0];
}

export async function getCompanyMobileByCompanyId(company_id) {
    const { rows } = await pool.query(
        `SELECT company_name AS name, director_mobile AS mobile
         FROM auths.company_kyc
         WHERE company_id = $1`,
        [company_id]
    );
    return rows[0];
}
