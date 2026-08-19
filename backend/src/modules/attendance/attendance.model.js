import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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

        enrollment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true,
        },

        date: {
            type: Date,
            required: true,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["present", "absent", "late"],
            required: true,
            default: "present",
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        remarks: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

attendanceSchema.index(
    {
        student: 1,
        course: 1,
        date: 1,
    },
    {
        unique: true,
    }
);

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

export default Attendance;