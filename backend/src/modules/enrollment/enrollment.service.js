import Course from "../courses/course.model.js";
import Enrollment from "./enrollment.model.js";
import User from "../users/user.model.js";


const createEnrollment = async(studentId, courseId) => {

    const student = await User.findOne({
        _id: studentId,
        role: "student",
        isActive: true,
    });

    if(!student){
        const error = new Error("student not found");
        error.statusCode = 404;
        throw error;
    }


    const course = await Course.findById(courseId);

    if(!course){
        const error = new Error("course not found");
        error.statusCode = 404;
        throw error;
    }


    if(!course.isActive){
        const error = new Error("course is not active");
        error.statusCode = 400;
        throw error;
    }


    if(new Date() > new Date(course.enrollmentDeadline)){
        const error = new Error("Enrollment deadline has passed");
        error.statusCode = 400;
        throw error;
    }


    const existingEnrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if(existingEnrollment){
        const error = new Error(
            "student is already enrolled in this course"
        );
        error.statusCode = 409;
        throw error;
    }


    const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
        status: "pending",
    });


    return await Enrollment.findById(enrollment._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        );
};


const getMyEnrollments = async(studentId) => {

    return await Enrollment.find({
        student: studentId,
    })
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        )
        .sort({
            createdAt: -1
        });
};


const getEnrollmentById = async(
    enrollmentId,
    userId,
    role
) => {

    const enrollment = await Enrollment.findById(
        enrollmentId
    )
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        );


    if(!enrollment){
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }


    if(
        role === "student" &&
        enrollment.student._id.toString() !== userId.toString()
    ){
        const error = new Error(
            "you are not authorized to view this enrollment"
        );
        error.statusCode = 403;
        throw error;
    }


    return enrollment;
};


const getAllEnrollments = async() => {

    return await Enrollment.find()
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        )
        .sort({
            createdAt: -1
        });
};


const updateEnrollmentStatus = async(
    enrollmentId,
    status
) => {

    const enrollment = await Enrollment.findById(
        enrollmentId
    );


    if(!enrollment){
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }


    enrollment.status = status;


    if(status === "completed"){
        enrollment.completedAt = new Date();
        enrollment.progress = 100;
    }


    if(status !== "completed"){
        enrollment.completedAt = null;
    }


    await enrollment.save();


    return await Enrollment.findById(enrollment._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        );
};


const cancelEnrollment = async(
    enrollmentId,
    studentId
) => {

    const enrollment = await Enrollment.findById(
        enrollmentId
    );


    if(!enrollment){
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }


    if(
        enrollment.student.toString() !==
        studentId.toString()
    ){
        const error = new Error(
            "you are not authorized to cancel this enrollment"
        );
        error.statusCode = 403;
        throw error;
    }


    if(enrollment.status === "completed"){
        const error = new Error(
            "completed enrollment cannot be cancelled"
        );
        error.statusCode = 400;
        throw error;
    }


    if(enrollment.status === "cancelled"){
        const error = new Error(
            "Enrollment is already cancelled"
        );
        error.statusCode = 400;
        throw error;
    }


    enrollment.status = "cancelled";

    await enrollment.save();


    return await Enrollment.findById(enrollment._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        );
};


const enrollmentService = {
    createEnrollment,
    getMyEnrollments,
    getEnrollmentById,
    getAllEnrollments,
    updateEnrollmentStatus,
    cancelEnrollment,
};


export default enrollmentService;