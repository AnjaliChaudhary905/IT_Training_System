
import api from "../api/axiosInstance";

// Admin Dashboard
export const getAdminDashboard = async () => {
    try {
        const response = await api.get("/dashboard/admin");

        return response.data;
    } catch (error) {
        console.error(
            "Failed to fetch admin dashboard:",
            error
        );

        throw error;
    }
};

// Instructor Dashboard
export const getInstructorDashboard = async () => {
    try {
        const response = await api.get("/dashboard/instructor");

        return response.data;
    } catch (error) {
        console.error(
            "Failed to fetch instructor dashboard:",
            error
        );

        throw error;
    }
};
