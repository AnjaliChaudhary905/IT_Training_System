import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import enrollmentService from "./enrollment.service.js";


const createEnrollment = asyncHandler(async (req, res) => {

    const enrollment = await enrollmentService.createEnrollment(
        req.user._id,
        req.body.courseId
    );

    return successResponse(
        res,
        enrollment,
        "Enrollment created successfully",
        201
    );
});


const getMyEnrollments = asyncHandler(async (req, res) => {

    const enrollments = await enrollmentService.getMyEnrollments(
        req.user._id
    );

    return successResponse(
        res,
        enrollments,
        "Enrollments fetched successfully",
        200
    );
});


const getEnrollmentById = asyncHandler(async (req, res) => {

    const enrollment = await enrollmentService.getEnrollmentById(
        req.params.id,
        req.user._id,
        req.user.role
    );

    return successResponse(
        res,
        enrollment,
        "Enrollment fetched successfully",
        200
    );
});


const getAllEnrollments = asyncHandler(async (req, res) => {

    const enrollments = await enrollmentService.getAllEnrollments();

    return successResponse(
        res,
        enrollments,
        "Enrollments fetched successfully",
        200
    );
});


const updateEnrollmentStatus = asyncHandler(async (req, res) => {

    const enrollment = await enrollmentService.updateEnrollmentStatus(
        req.params.id,
        req.body.status
    );

    return successResponse(
        res,
        enrollment,
        "Enrollment status updated successfully",
        200
    );
});


const cancelEnrollment = asyncHandler(async (req, res) => {

    const enrollment = await enrollmentService.cancelEnrollment(
        req.params.id,
        req.user._id
    );

    return successResponse(
        res,
        enrollment,
        "Enrollment cancelled successfully",
        200
    );
});


const enrollmentController = {
    createEnrollment,
    getMyEnrollments,
    getEnrollmentById,
    getAllEnrollments,
    updateEnrollmentStatus,
    cancelEnrollment,
};


export default enrollmentController;