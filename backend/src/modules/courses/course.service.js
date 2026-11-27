
import mongoose from "mongoose";
import Course from "./course.model.js";
import User from "../users/user.model.js";
import uploadToCloudinary, { deleteFromCloudinary,} from "../../utils/cloudinary.js";

const validateInstructor = async (instructorId) => {
    if (
        instructorId === undefined ||
        instructorId === null ||
        instructorId === ""
    ) {
        return null;
    }

    // Check whether the supplied ID is valid
    if (!mongoose.isValidObjectId(instructorId)) {
        const error = new Error("Invalid instructor ID");
        error.statusCode = 400;
        throw error;
    }

    // Check instructor existence, role, and active status
    const instructor = await User.findOne({
        _id: instructorId,
        role: "instructor",
        isActive: true,
    });

    if (!instructor) {
        const error = new Error(
            "Instructor not found or inactive"
        );
        error.statusCode = 400;
        throw error;
    }

    return instructor._id;
};


// Create Course
const createCourse = async (courseData, userId, imageFile) => {
    const existingCourse = await Course.findOne({
        title: courseData.title,
    });

    if (existingCourse) {
        const error = new Error(
            "Course with this title already exists"
        );
        error.statusCode = 409;
        throw error;
    }

    // Validate optional instructor assignment
    const instructorId = await validateInstructor(
        courseData.instructor
    );

    // Handle course image
    let image = {
        url: "",
        publicId: "",
    };

    if (imageFile) {
        const uploadedImage = await uploadToCloudinary(
            imageFile.buffer,
            "IT_Training_System/courses"
        );

        image = {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        };
    }

    // Remove instructor from courseData before spreading
    const { instructor, ...courseDetails } = courseData;

    const course = await Course.create({
        ...courseDetails,
        image,
        createdBy: userId,
        instructor: instructorId,
    });

    await course.populate(
        "instructor",
        "firstName lastName email specialization"
    );

    return course;
};


// Get All Courses
const getAllCourses = async () => {
    const courses = await Course.find()
        .populate(
            "instructor",
            "firstName lastName email specialization"
        );

    return courses;
};

// Get Courses Assigned to Logged-in Instructor
const getMyCourses = async (instructorId) => {
    const courses = await Course.find({
        instructor: instructorId,
    })
        .populate(
            "instructor",
            "firstName lastName email specialization"
        )
        .sort({ createdAt: -1 });

    return courses;
};


// Get Courses By Category
const getCoursesByCategory = async (category) => {
    const courses = await Course.find({
        category: {
            $regex: `^${category}$`,
            $options: "i",
        },
    }).populate(
        "instructor",
        "firstName lastName email specialization"
    );

    return courses;
};


// Get Categories
const getCategories = async () => {
    const categories = await Course.distinct("category");

    return categories;
};


// Get Course By ID
const getCourseById = async (id) => {
    const course = await Course.findById(id)
        .populate(
            "createdBy",
            "firstName lastName email"
        )
        .populate(
            "instructor",
            "firstName lastName email specialization"
        );

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    return course;
};


// Update Course
const updateCourse = async (id, courseData, imageFile) => {
    const course = await Course.findById(id);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    // Check duplicate course title
    if (
        courseData.title &&
        courseData.title.toLowerCase() !==
            course.title.toLowerCase()
    ) {
        const existingCourse = await Course.findOne({
            title: courseData.title,
            _id: { $ne: id },
        });

        if (existingCourse) {
            const error = new Error("Course already exists");
            error.statusCode = 409;
            throw error;
        }
    }

    // Handle instructor assignment only when provided
    const { instructor, ...updateData } = courseData;

    if (instructor !== undefined) {
        course.instructor = await validateInstructor(instructor);
    }

    // Handle optional course image
    if (imageFile) {
        const uploadedImage = await uploadToCloudinary(
            imageFile.buffer,
            "IT_Training_System/courses"
        );

        if (course.image?.publicId) {
            await deleteFromCloudinary(
                course.image.publicId
            );
        }

        updateData.image = {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        };
    }

    Object.assign(course, updateData);

    await course.save();

    await course.populate(
        "createdBy",
        "firstName lastName email"
    );

    await course.populate(
        "instructor",
        "firstName lastName email specialization"
    );

    return course;
};


// Delete Course
const deleteCourse = async (id) => {
    const course = await Course.findById(id);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    if (course.image?.publicId) {
        await deleteFromCloudinary(
            course.image.publicId
        );
    }

    await course.deleteOne();

    return true;
};


const courseService = {
    createCourse,
    getAllCourses,
    getMyCourses,
    getCoursesByCategory,
    getCategories,
    getCourseById,
    updateCourse,
    deleteCourse,
};

export default courseService;
