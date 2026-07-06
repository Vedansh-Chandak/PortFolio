import { getDashboardStats } from "../models/dashboard.model.js";

export const fetchDashboardStats = () => {
    return getDashboardStats();
};