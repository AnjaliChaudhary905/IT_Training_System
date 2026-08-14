import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
                "cancelled",
                "completed",
            ],
            default: "pending"
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

enrollmentSchema.index(
    { student: 1, course: 1 },
    { unique: true }
);

const Enrollment = mongoose.model(
    "Enrollment",
    enrollmentSchema
)
export default Enrollment;