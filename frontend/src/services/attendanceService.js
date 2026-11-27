import api from "../api/axiosInstance";

const createAttendance = async (data) => {
    const response = await api.post(
        "/attendance",
        data
    );

    return response.data;
};

const getMyAttendance = async () => {
    const response = await api.get(
        "/attendance/my"
    );

    return response.data;
};

const getAllAttendance = async () => {
    const response = await api.get(
        "/attendance"
    );

    return response.data;
};

const getAttendanceById = async (id) => {
    const response = await api.get(
        `/attendance/${id}`
    );

    return response.data;
};

const getCourseAttendance = async (courseId) => {
    const response = await api.get(
        `/attendance/course/${courseId}`
    );

    return response.data;
};

const updateAttendance = async (id, data) => {
    const response = await api.patch(
        `/attendance/${id}`,
        data
    );

    return response.data;
};

const attendanceService = {
    createAttendance,
    getMyAttendance,
    getAllAttendance,
    getAttendanceById,
    getCourseAttendance,
    updateAttendance,
};

export default attendanceService;