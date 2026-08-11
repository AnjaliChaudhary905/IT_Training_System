import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import instructorService from "./instructor.service.js";


const getMyProfile = asyncHandler(async (req, res) => {
    const instructor = await instructorService.getMyProfile(
        req.user._id
    );

    return successResponse(
        res,
        instructor,
        "Instructor profile fetched successfully",
        200
    );
});


const updateMyProfile = asyncHandler(async (req, res) => {
    const instructor = await instructorService.updateMyProfile(
        req.user._id,
        req.body
    );

    return successResponse(
        res,
        instructor,
        "Instructor profile updated successfully",
        200
    );
});


const getAllInstructors = asyncHandler(async (req, res) => {
    const instructors = await instructorService.getAllInstructors();

    return successResponse(
        res,
        instructors,
        "Instructors fetched successfully",
        200
    );
});


const getInstructorById = asyncHandler(async (req, res) => {
    const instructor = await instructorService.getInstructorById(
        req.params.id
    );

    return successResponse(
        res,
        instructor,
        "Instructor fetched successfully",
        200
    );
});


const updateInstructor = asyncHandler(async (req, res) => {
    const instructor = await instructorService.updateInstructor(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        instructor,
        "Instructor updated successfully",
        200
    );
});


const updateInstructorStatus = asyncHandler(async (req, res) => {
    const instructor =
        await instructorService.updateInstructorStatus(
            req.params.id,
            req.body.isActive
        );

    return successResponse(
        res,
        instructor,
        "Instructor status updated successfully",
        200
    );
});


const instructorController = {
    getMyProfile,
    updateMyProfile,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    updateInstructorStatus,
};


export default instructorController;