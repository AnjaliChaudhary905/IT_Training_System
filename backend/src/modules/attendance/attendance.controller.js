import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import attendanceService from "./attendance.service.js";


const createAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.createAttendance(
        req.user._id,
        req.body.studentId,
        req.body.courseId,
        req.body.enrollmentId,
        req.body.date,
        req.body.status,
        req.body.remarks
    );

    return successResponse(
        res,
        attendance,
        "Attendance marked successfully",
        201
    );
});


const getMyAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getMyAttendance(
        req.user._id
    );

    return successResponse(
        res,
        attendance,
        "Attendance fetched successfully",
        200
    );
});


const getAttendanceById = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getAttendanceById(
        req.params.id,
        req.user._id,
        req.user.role
    );

    return successResponse(
        res,
        attendance,
        "Attendance fetched successfully",
        200
    );
});


const getAllAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getAllAttendance();

    return successResponse(
        res,
        attendance,
        "Attendance records fetched successfully",
        200
    );
});


const getCourseAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getCourseAttendance(
        req.params.courseId
    );

    return successResponse(
        res,
        attendance,
        "Course attendance fetched successfully"
    );
});


const updateAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.updateAttendance(
        req.params.id,
        req.body.status,
        req.body.date,
        req.body.remarks
    );

    return successResponse(
        res,
        attendance,
        "Attendance updated successfully"
    );
});


const attendanceController = {
    createAttendance,
    getMyAttendance,
    getAttendanceById,
    getAllAttendance,
    getCourseAttendance,
    updateAttendance
};

export default attendanceController;