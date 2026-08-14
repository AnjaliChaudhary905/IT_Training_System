import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import paymentService from "./payment.service.js";


const createPayment = asyncHandler(async (req, res) => {

    const payment = await paymentService.createPayment(
        req.user._id,
        req.body.enrollmentId,
        req.body.paymentMethod,
        req.body.transactionId
    );

    return successResponse(
        res,
        payment,
        "Payment created successfully",
        201
    );
});


const getMyPayments = asyncHandler(async (req, res) => {

    const payments = await paymentService.getMyPayments(
        req.user._id
    );

    return successResponse(
        res,
        payments,
        "Payments fetched successfully"
    );
});


const getPaymentById = asyncHandler(async (req, res) => {

    const payment = await paymentService.getPaymentById(
        req.params.id,
        req.user._id,
        req.user.role
    );

    return successResponse(
        res,
        payment,
        "Payment fetched successfully"
    );
});


const getAllPayments = asyncHandler(async (req, res) => {

    const payments = await paymentService.getAllPayments();

    return successResponse(
        res,
        payments,
        "Payments fetched successfully"
    );
});


const updatePaymentStatus = asyncHandler(async (req, res) => {

    const payment = await paymentService.updatePaymentStatus(
        req.params.id,
        req.body.status
    );

    return successResponse(
        res,
        payment,
        "Payment status updated successfully"
    );
});


const paymentController = {
    createPayment,
    getMyPayments,
    getPaymentById,
    getAllPayments,
    updatePaymentStatus,
};


export default paymentController;