import { body, param } from "express-validator";


export const createPaymentValidation = [
    body("enrollmentId")
        .trim()
        .notEmpty()
        .withMessage("Enrollment ID is required")
        .isMongoId()
        .withMessage("Invalid enrollment ID"),

    body("paymentMethod")
        .optional()
        .trim()
        .isIn([
            "cash",
            "esewa",
            "khalti",
            "bank_transfer",
        ])
        .withMessage("Invalid payment method"),

    body("transactionId")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Transaction ID must be between 3 and 100 characters"
        ),
];


export const paymentIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid payment ID"),
];


export const updatePaymentStatusValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid payment ID"),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Payment status is required")
        .isIn([
            "paid",
            "failed",
            "refunded",
        ])
        .withMessage("Invalid payment status"),
];