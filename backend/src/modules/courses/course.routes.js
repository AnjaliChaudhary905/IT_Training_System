import express from "express";

import { ROLES } from "../../constants/roles.js";

import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import protect from "../../middleware/auth.middleware.js";

import courseController from "./course.controller.js";

import {
    createCourseValidation,
    updateCourseValidation,
} from "./course.validation.js";

import upload from "../../middleware/upload.middleware.js";
import parseCourseData from "../../middleware/parseCourseData.middleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.ADMIN),
    upload.single("image"),
    parseCourseData,
    createCourseValidation,
    validate,
    courseController.createCourse
);

router.get(
    "/",
    protect,
    courseController.getAllCourses
);

router.get(
    "/:id",
    protect,
    courseController.getCourseById
);

router.put(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    upload.single("image"),
    parseCourseData,
    updateCourseValidation,
    validate,
    courseController.updateCourse
);

router.delete(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    courseController.deleteCourse
);


export default router;