import api from "../api/axiosInstance";

const createContactMessage = async (data) => {
    const response = await api.post("/contact", data);

    return response.data;
};

const getAllContactMessages = async () => {
    const response = await api.get("/contact");

    return response.data;
};

const getContactMessageById = async (id) => {
    const response = await api.get(`/contact/${id}`);

    return response.data;
};

const updateContactStatus = async (id, status) => {
    const response = await api.patch(
        `/contact/${id}/status`,
        { status }
    );

    return response.data;
};

const deleteContactMessage = async (id) => {
    const response = await api.delete(`/contact/${id}`);

    return response.data;
};

const contactServices = {
    createContactMessage,
    getAllContactMessages,
    getContactMessageById,
    updateContactStatus,
    deleteContactMessage,
};

export default contactServices;