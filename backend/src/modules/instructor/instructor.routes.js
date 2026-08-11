import express from "express"
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import instructorController from "./instructor.controller.js";
import { instructorIdValidation, updateInstructorByAdminValidation, updateInstructorStatusValidation, updateInstructorValidation } from "./instructor.validation.js";
import validate from "../../middleware/validate.middleware.js";


const router = express.Router();

router.get(
    "/me",
    protect,
    authorize("instructor"),
    instructorController.getMyProfile
)

router.patch(
    "/me",
    protect,
    authorize("instructor"),
    updateInstructorValidation,
    validate,
    instructorController.updateMyProfile
)

router.get(
    "/",
    protect,
    authorize("admin"),
    instructorController.getAllInstructors
);

router.get(
    "/:id",
    protect,
    authorize("admin"),
    instructorIdValidation,
    validate,
    instructorController.getInstructorById
)

router.patch(
    "/:id",
    protect,
    authorize("admin"),
    updateInstructorByAdminValidation,
    validate,
    instructorController.updateInstructor
)

router.patch(
    "/:id/status",
    protect,
    authorize("admin"),
   updateInstructorStatusValidation,
    validate,
    instructorController.updateInstructorStatus
)


export default router;