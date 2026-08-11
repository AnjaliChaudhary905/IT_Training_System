import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import studentController from "./student.controller.js";

import {
    studentIdValidation,
    updateStudentByAdminValidation,
    updateStudentStatusValidation,
    updateStudentValidation,
} from "./student.validation.js";

import validate from "../../middleware/validate.middleware.js";


const router = express.Router();


router.get(
    "/me",
    protect,
    authorize("student"),
    studentController.getMyProfile
);


router.patch(
    "/me",
    protect,
    authorize("student"),
    updateStudentValidation,
    validate,
    studentController.updateMyProfile
);


router.get(
    "/",
    protect,
    authorize("admin"),
    studentController.getAllStudents
);


router.get(
    "/:id",
    protect,
    authorize("admin"),
    studentIdValidation,
    validate,
    studentController.getStudentById
);


router.patch(
    "/:id",
    protect,
    authorize("admin"),
    updateStudentByAdminValidation,
    validate,
    studentController.updateStudent
);


router.patch(
    "/:id/status",
    protect,
    authorize("admin"),
    updateStudentStatusValidation,
    validate,
    studentController.updateStudentStatus
);


export default router;