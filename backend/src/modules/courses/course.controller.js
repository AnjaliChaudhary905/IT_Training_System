import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import courseService from "./course.service.js";


const createCourse = asyncHandler(async (req, res) => {
    const course = await courseService.createCourse(
        req.body,
        req.user._id,
        req.file
    )
    return successResponse(
        res,
        course,
        "course created successfully",
        201
    )
});

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();

    return successResponse(
        res,
        courses,
        "courses retrived successfully"
    )
})

const getCourseById = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById(
        req.params.id
    )

    return successResponse(
        res,
        course,
        "course retrived successfully"
    )
})

const updateCourse = asyncHandler(async (req, res) => {
    const course = await courseService.updateCourse(
        req.params.id,
        req.body,
        req.file
    )

    return successResponse(
        res,
        course,
        "course updated successfully"
    )
})

const deleteCourse = asyncHandler(async (req, res) => {
    await courseService.deleteCourse(req.params.id);

    return successResponse(
        res,
        null,
        "course deleted successfully"
    )
})

const courseController = {

    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}

export default courseController;