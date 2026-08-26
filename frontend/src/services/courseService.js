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

const courseServices = {
    getAllCourses,
    getCourseCategories,
    getCoursesByCategory,
    getCourseById,
};

export default courseServices;