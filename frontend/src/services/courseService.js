
import api from "../api/axiosInstance";

const getAllCourses = async () => {
    const response = await api.get("/courses");

    return response.data;
};

const getCourseCategories = async () => {
    const response = await api.get("/courses/categories");

    return response.data;
};

const getCoursesByCategory = async (category) => {
    const response = await api.get(
        `/courses/category/${encodeURIComponent(category)}`
    );

    return response.data;
};

const getCourseById = async (id) => {
    const response = await api.get(`/courses/${id}`);

    return response.data;
};

// Get courses assigned to the logged-in instructor
const getMyCourses = async () => {
    const response = await api.get("/courses/my-courses");

    return response.data;
};

// Create course
const createCourse = async (data) => {
    const response = await api.post(
        "/courses",
        data
    );

    return response.data;
};

// Delete course
const deleteCourse = async (id) => {
    const response = await api.delete(
        `/courses/${id}`
    );

    return response.data;
};

// Update course
const updateCourse = async (id, data) => {
    const response = await api.put(
        `/courses/${id}`,
        data
    );

    return response.data;
};

const courseServices = {
    getAllCourses,
    getCourseCategories,
    getCoursesByCategory,
    getCourseById,
    getMyCourses,
    createCourse,
    deleteCourse,
    updateCourse,
};

export default courseServices;
