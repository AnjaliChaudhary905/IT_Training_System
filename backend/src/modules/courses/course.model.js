import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },

        duration: {
            type: String,
            required: true,
            trim: true,
        },

        fee: {
            type: Number,
            required: true,
            min: 0,
        },

        syllabus: [
            {
                type: String,
                trim: true,
            },
        ],

        prerequisites: [
            {
                type: String,
                trim: true,
            },
        ],

        enrollmentDeadline: {
            type: Date,
            required: true,
        },

        image: {
            url: {
                type: String,
                default: "",
            },
            publicId: {
                type: String,
                default: "",
            },
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;