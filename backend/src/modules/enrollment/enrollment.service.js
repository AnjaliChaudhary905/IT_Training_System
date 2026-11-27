
import Course from "../courses/course.model.js";
import Enrollment from "./enrollment.model.js";
import User from "../users/user.model.js";

const createEnrollment = async (studentId, courseId) => {
    const student = await User.findOne({
        _id: studentId,
        role: "student",
        isActive: true,
    });

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }

    const course = await Course.findById(courseId);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    if (!course.isActive) {
        const error = new Error("Course is not active");
        error.statusCode = 400;
        throw error;
    }

    if (new Date() > new Date(course.enrollmentDeadline)) {
        const error = new Error("Enrollment deadline has passed");
        error.statusCode = 400;
        throw error;
    }

    const existingEnrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if (existingEnrollment) {
        const error = new Error(
            "Student is already enrolled in this course"
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

const getMyEnrollments = async (studentId) => {
    return await Enrollment.find({
        student: studentId,
    })
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        )
        .sort({
            createdAt: -1,
        });
};

const getEnrollmentById = async (
    enrollmentId,
    userId,
    role
) => {
    const enrollment = await Enrollment.findById(enrollmentId)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee enrollmentDeadline image isActive"
        );

    if (!enrollment) {
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }

    if (
        role === "student" &&
        enrollment.student._id.toString() !== userId.toString()
    ) {
        const error = new Error(
            "You are not authorized to view this enrollment"
        );
        error.statusCode = 403;
        throw error;
    }

    return enrollment;
};

const getAllEnrollments = async () => {
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
            createdAt: -1,
        });
};

// Update enrollment status
const updateEnrollmentStatus = async (
    enrollmentId,
    status,
    userId,
    role
) => {
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }

    // Instructor-specific permission checks
    if (role === "instructor") {
        // Find the course belonging to this enrollment
        const course = await Course.findById(enrollment.course);

        if (!course) {
            const error = new Error("Course not found");
            error.statusCode = 404;
            throw error;
        }

        // Make sure the instructor owns this course
        if (
            course.instructor?.toString() !== userId.toString()
        ) {
            const error = new Error(
                "You are not authorized to update enrollments for this course"
            );
            error.statusCode = 403;
            throw error;
        }

        // Allowed instructor status transitions
        const allowedTransitions = {
            pending: ["approved", "rejected"],
            approved: ["completed"],
        };

        const allowedStatuses =
            allowedTransitions[enrollment.status] || [];

        if (!allowedStatuses.includes(status)) {
            const error = new Error(
                `You cannot change enrollment status from ${enrollment.status} to ${status}`
            );
            error.statusCode = 400;
            throw error;
        }
    }

    // Update enrollment status
    enrollment.status = status;

    if (status === "completed") {
        enrollment.completedAt = new Date();
        enrollment.progress = 100;
    } else {
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

const cancelEnrollment = async (
    enrollmentId,
    studentId
) => {
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }

    if (
        enrollment.student.toString() !== studentId.toString()
    ) {
        const error = new Error(
            "You are not authorized to cancel this enrollment"
        );
        error.statusCode = 403;
        throw error;
    }

    if (enrollment.status === "completed") {
        const error = new Error(
            "Completed enrollment cannot be cancelled"
        );
        error.statusCode = 400;
        throw error;
    }

    if (enrollment.status === "cancelled") {
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

const getEnrollmentsByStudent = async (studentId) => {
    const enrollments = await Enrollment.find({
        student: studentId,
    })
        .populate(
            "student",
            "firstName lastName email phone avatar"
        )
        .populate(
            "course",
            "title category level duration fee image"
        )
        .sort({
            enrollmentDate: -1,
        });

    return enrollments;
};

const getEnrollmentsByCourse = async (
    courseId,
    userId,
    role
) => {
    const course = await Course.findById(courseId);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }

    if (
        role === "instructor" &&
        course.instructor?.toString() !== userId.toString()
    ) {
        const error = new Error(
            "You are not authorized to view enrollments for this course"
        );
        error.statusCode = 403;
        throw error;
    }

    const enrollments = await Enrollment.find({
        course: courseId,
        status: { $ne: "cancelled" },
    })
        .populate(
            "student",
            "firstName lastName email phone avatar role isActive"
        )
        .populate(
            "course",
            "title category level duration"
        )
        .sort({
            enrollmentDate: -1,
        });

    return enrollments;
};

const enrollmentService = {
    createEnrollment,
    getMyEnrollments,
    getEnrollmentById,
    getAllEnrollments,
    updateEnrollmentStatus,
    cancelEnrollment,
    getEnrollmentsByStudent,
    getEnrollmentsByCourse,
};

export default enrollmentService;
