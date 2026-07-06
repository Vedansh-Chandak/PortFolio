import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { fetchDashboardStats } from "../services/dashboard.service.js";

export const getStats = asyncHandler(async (req, res) => {

    const stats = fetchDashboardStats();

    return res.status(200).json(
        new ApiResponse(
            200,
            stats,
            "Dashboard statistics fetched successfully"
        )
    );

});