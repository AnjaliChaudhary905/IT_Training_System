import Course from "./course.model.js";
import uploadToCloudinary, { deleteFromCloudinary } from "../../utils/cloudinary.js";
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

    const course = await Course.create({
        ...courseData,
        image,
        createdBy: userId,
    });

    return course;
};

const getAllCourses = async()=>{
    return await Course.find()
    .populate("createdBy", "firstName lastName email")
    .sort({createdAt: -1})
}

const getCourseById = async(id)=>{
    const course = await Course.findById(id)
    .populate("createdBy", "firstName lastName email");

    if(!course){
        const error = new Error("course not found");
        error.statusCode = 404;
        throw error;
    }
    return course;
}

const updateCourse = async (id, courseData, imageFile) => {
    const course = await Course.findById(id);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

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

        courseData.image = {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        };
    }

    Object.assign(course, courseData);

    await course.save();

    await course.populate(
        "createdBy",
        "firstName lastName email"
    );

    return course;
};
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
    getCourseById,
    updateCourse,
    deleteCourse,
}

export default courseService;