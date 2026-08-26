import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import contactService from "./contact.service.js";


// Create contact message
const createContactMessage = asyncHandler(async (req, res) => {
    const contact = await contactService.createContactMessage(req.body);

    return successResponse(
        res,
        contact,
        "contact message submitted successfully",
        201
    );
});


// Get all contact messages
const getAllContactMessages = asyncHandler(async (req, res) => {
    const contacts = await contactService.getAllContactMessages();

    return successResponse(
        res,
        contacts,
        "contact messages retrieved successfully"
    );
});


// Get contact message by ID
const getContactMessageById = asyncHandler(async (req, res) => {
    const contact = await contactService.getContactMessageById(
        req.params.id
    );

    if (!contact) {
        return errorResponse(
            res,
            "contact message not found",
            404
        );
    }

    return successResponse(
        res,
        contact,
        "contact message retrieved successfully"
    );
});


// Update contact message status
const updateContactStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const contact = await contactService.updateContactStatus(
        req.params.id,
        status
    );

    if (!contact) {
        return errorResponse(
            res,
            "contact message not found",
            404
        );
    }

    return successResponse(
        res,
        contact,
        "contact message status updated successfully"
    );
});


// Delete contact message
const deleteContactMessage = asyncHandler(async (req, res) => {
    const contact = await contactService.deleteContactMessage(
        req.params.id
    );

    if (!contact) {
        return errorResponse(
            res,
            "contact message not found",
            404
        );
    }

    return successResponse(
        res,
        null,
        "contact message deleted successfully"
    );
});


const contactController = {
    createContactMessage,
    getAllContactMessages,
    getContactMessageById,
    updateContactStatus,
    deleteContactMessage,
};

export default contactController;