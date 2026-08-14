import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import paymentController from "./payment.controller.js";

import {
    createPaymentValidation,
    paymentIdValidation,
    updatePaymentStatusValidation,
} from "./payment.validation.js";


const router = express.Router();

router.post(
    "/",
    protect,
    authorize("student"),
    createPaymentValidation,
    validate,
    paymentController.createPayment
);

router.get(
    "/me",
    protect,
    authorize("student"),
    paymentController.getMyPayments
);

router.get(
    "/",
    protect,
    authorize("admin"),
    paymentController.getAllPayments
);

router.get(
    "/:id",
    protect,
    authorize("student", "admin"),
    paymentIdValidation,
    validate,
    paymentController.getPaymentById
);

router.patch(
    "/:id/status",
    protect,
    authorize("admin"),
    updatePaymentStatusValidation,
    validate,
    paymentController.updatePaymentStatus
);


export default router;