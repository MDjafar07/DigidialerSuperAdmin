import pool from "../config/db.js";

export const getCompanyCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM auths.company");
  return parseInt(result.rows[0].count);
};

export const getAdminCount = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM auths.users WHERE global_role = 'admin'"
  );
  return parseInt(result.rows[0].count);
};

export const getAgentCount = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM auths.users WHERE global_role = 'agent'"
  );
  return parseInt(result.rows[0].count);
};

export const getTeamCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM auths.teams");
  return parseInt(result.rows[0].count);
};

export const getKycStatusData = async () => {
  const result = await pool.query(`
    SELECT status, COUNT(*) AS count
    FROM auths.company_kyc
    GROUP BY status
  `);
  return result.rows;
};

export const getCompanyGrowthData = async () => {
  const result = await pool.query(`
    SELECT TO_CHAR(created_at, 'Mon YYYY') AS month, COUNT(*) AS count
    FROM auths.company
    GROUP BY month
    ORDER BY MIN(created_at)
  `);
  return result.rows;
};
