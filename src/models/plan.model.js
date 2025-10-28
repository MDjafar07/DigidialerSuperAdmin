import pool from "../config/db.js";

//Create plan
export async function createPlanModel({name,price,call_limit,sms_limit,unlimited_calls,unlimited_sms,description}){
    const {rows} = await pool.query(
        `INSERT INTO subscriptions.plans (name,price,call_limit,sms_limit,unlimited_calls,unlimited_sms,description)
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [name, price, call_limit, sms_limit, unlimited_calls || false, unlimited_sms || false, description]
    );
    return rows[0];
}

// Get all plan
export async function getAllPlan(){
    const {rows} = await pool.query(
        `SELECT * FROM subscriptions.plans ORDER BY price`,
        
    );
    return rows;
}

//Get Plan By Id
export async function getPlanById(id){
    const {rows} = await pool.query(
        `SELECT * FROM subscriptions.plans WHERE id=$1`,
        [id]
    );
    return rows[0];
}

// plans update
export async function updatePlan(id, { name, price, call_limit, sms_limit, unlimited_calls, unlimited_sms, description }) {
    const { rows } = await pool.query(
        `UPDATE subscriptions.plans 
         SET name=$1, price=$2, call_limit=$3, sms_limit=$4, unlimited_calls=$5, unlimited_sms=$6, description=$7, updated_at=NOW() 
         WHERE id=$8 RETURNING *`,
        [name, price, call_limit, sms_limit, unlimited_calls, unlimited_sms, description, id]
    );
    return rows[0];
}


// delete plan

export async function deletePlan(id){
    const {rows} = await pool.query(
        `DELETE FROM subscriptions.plans WHERE id=$1`,
        [id]
    );
};