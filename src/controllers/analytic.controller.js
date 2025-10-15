import {
  getCompanyCount,
  getAdminCount,
  getAgentCount,
  getTeamCount,
  getKycStatusData,
  getCompanyGrowthData,
} from "../models/analytic.model.js";

export const getAnalyticsDataController = async (req, res) => {
  try {
    const [
      company,
      admins,
      agents,
      teams,
      kycStatus,
      companyGrowth,
    ] = await Promise.all([
      getCompanyCount(),
      getAdminCount(),
      getAgentCount(),
      getTeamCount(),
      getKycStatusData(),
      getCompanyGrowthData(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        company,
        admins,
        agents,
        teams,
        kycStatus,
        companyGrowth,
      },
      lastRefreshed: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Analytics error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
