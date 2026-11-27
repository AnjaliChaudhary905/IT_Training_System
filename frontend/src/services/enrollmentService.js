
import api from "../api/axiosInstance";

// Create a new enrollment (student)
const createEnrollment = async (data) => {
    const response = await api.post("/enrollments", data);
    return response.data;
};

// Get logged-in student's enrollments
const getMyEnrollments = async () => {
    const response = await api.get("/enrollments/me");
    return response.data;
};

// Get all enrollments (admin)
const getAllEnrollments = async () => {
    const response = await api.get("/enrollments");
    return response.data;
};

// Get a single enrollment by ID
const getEnrollmentById = async (id) => {
    const response = await api.get(`/enrollments/${id}`);
    return response.data;
};

// Get enrollments of a particular student (admin)
const getEnrollmentsByStudent = async (studentId) => {
    const response = await api.get(`/enrollments/student/${studentId}`);
    return response.data;
};

// NEW: Get enrollments for a particular course (admin/instructor)
const getEnrollmentsByCourse = async (courseId) => {
    const response = await api.get(`/enrollments/course/${courseId}`);
    return response.data;
};

// Update enrollment status (admin)
const updateEnrollmentStatus = async (id, status) => {
    const response = await api.patch(`/enrollments/${id}/status`, { status });
    return response.data;
};

// Cancel enrollment (student)
const cancelEnrollment = async (id) => {
    const response = await api.patch(`/enrollments/${id}/cancel`);
    return response.data;
};

const enrollmentServices = {
    createEnrollment,
    getMyEnrollments,
    getAllEnrollments,
    getEnrollmentById,
    getEnrollmentsByStudent,
    getEnrollmentsByCourse, // NEW
    updateEnrollmentStatus,
    cancelEnrollment,
};

export default enrollmentServices;
