import express from "express"
import authorize from "../../middleware/authorize.middleware.js";
import { createAttendanceValidation, updateAttendanceValidation } from "./attendance.validation.js";
import validate from "../../middleware/validate.middleware.js";
import attendanceController from "./attendance.controller.js";
import protect from "../../middleware/auth.middleware.js";



const router = express.Router();

router.post(
    "/",
    protect,
    authorize("admin","instructor"),
    createAttendanceValidation,
    validate,
    attendanceController.createAttendance
)

router.get(
    "/my",
    protect,
    authorize("student"),
    attendanceController.getMyAttendance
)

router.get(
    "/",
    protect,
    authorize("admin","instructor"),
    attendanceController.getAllAttendance
)

router.get(
    "/course/:courseId",
    protect,
    authorize("admin","instructor"),
    attendanceController.getCourseAttendance
)

router.get(
    "/:id",
    protect,
    authorize("admin","instructor","student"),
    validate,
    attendanceController.getAttendanceById
)

router.patch(
    "/:id",
    protect,
    authorize("admin","instructor"),
    updateAttendanceValidation,
    validate,
    attendanceController.updateAttendance
)

export default router;