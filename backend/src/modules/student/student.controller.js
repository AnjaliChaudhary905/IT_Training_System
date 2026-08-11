import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import studentService from "./student.service.js";


const getMyProfile = asyncHandler(async (req, res) => {
    const student = await studentService.getMyProfile(
        req.user._id
    );

    return successResponse(
        res,
        student,
        "Student profile fetched successfully",
        200
    );
});


const updateMyProfile = asyncHandler(async (req, res) => {
    const student = await studentService.updateMyProfile(
        req.user._id,
        req.body
    );

    return successResponse(
        res,
        student,
        "Student profile updated successfully",
        200
    );
});


const getAllStudents = asyncHandler(async (req, res) => {
    const students = await studentService.getAllStudents();

    return successResponse(
        res,
        students,
        "Students fetched successfully",
        200
    );
});


const getStudentById = asyncHandler(async (req, res) => {
    const student = await studentService.getStudentById(
        req.params.id
    );

    return successResponse(
        res,
        student,
        "Student fetched successfully",
        200
    );
});


const updateStudent = asyncHandler(async (req, res) => {
    const student = await studentService.updateStudent(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        student,
        "Student updated successfully",
        200
    );
});


const updateStudentStatus = asyncHandler(async (req, res) => {
    const student =
        await studentService.updateStudentStatus(
            req.params.id,
            req.body.isActive
        );

    return successResponse(
        res,
        student,
        "Student status updated successfully",
        200
    );
});


const studentController = {
    getMyProfile,
    updateMyProfile,
    getAllStudents,
    getStudentById,
    updateStudent,
    updateStudentStatus,
};


export default studentController;