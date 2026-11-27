import api from "../api/axiosInstance";

// Get logged-in instructor profile
const getMyProfile = async () => {
    const response = await api.get("/instructor/me");

    return response.data;
};


// Get courses assigned to the logged-in instructor
const getMyCourses = async () => {
    const response = await api.get("/courses/my-courses");

    return response.data;
};

// Update logged-in instructor profile
const updateMyProfile = async (data) => {
    const response = await api.patch(
        "/instructor/me",
        data
    );

    return response.data;
};

// Get all instructors - Admin
const getAllInstructors = async () => {
    const response = await api.get("/instructor");

    return response.data;
};

// Get instructor by ID - Admin
const getInstructorById = async (id) => {
    const response = await api.get(
        `/instructor/${id}`
    );

    return response.data;
};

// Update instructor - Admin
const updateInstructor = async (id, data) => {
    const response = await api.patch(
        `/instructor/${id}`,
        data
    );

    return response.data;
};

// Update instructor active/inactive status - Admin
const updateInstructorStatus = async (id, isActive) => {
    const response = await api.patch(
        `/instructor/${id}/status`,
        {
            isActive,
        }
    );

    return response.data;
};

const instructorServices = {
    getMyProfile,
    getMyCourses,
    updateMyProfile,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    updateInstructorStatus,
};

export default instructorServices;