import express from "express";

import contactController from "./contact.controller.js";

import { createContactValidation,updateContactStatusValidation } from "./contact.validation.js";

import  protect  from "../../middleware/auth.middleware.js";
import  authorize  from "../../middleware/authorize.middleware.js";
import  validate  from "../../middleware/validate.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = express.Router();

router.post(
    "/",
    createContactValidation,
    validate,
    contactController.createContactMessage
);
router.get(
    "/",
    protect,
    authorize(ROLES.ADMIN),
    contactController.getAllContactMessages
);
router.get(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    contactController.getContactMessageById
);
router.patch(
    "/:id/status",
    protect,
    authorize(ROLES.ADMIN),
    updateContactStatusValidation,
    validate,
    contactController.updateContactStatus
);
router.delete(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    contactController.deleteContactMessage
);

export default router;