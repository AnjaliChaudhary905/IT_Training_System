import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        enrollment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentMethod: {
            type: String,
            enum: [
                "cash",
                "esewa",
                "khalti",
                "bank_transfer",
            ],
            default: "cash",
        },

        transactionId: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded",
            ],
            default: "pending",
        },

        paidAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

paymentSchema.index(
    {
        enrollment: 1,
        status: 1,
    }
);

const Payment = mongoose.model(
    "Payment",
    paymentSchema
);

export default Payment;