import Attendance from "./attendance.model.js";
import User from "../users/user.model.js";
import Course from "../courses/course.model.js";
import Enrollment from "../enrollment/enrollment.model.js";


const createAttendance = async (
    markedBy,
    studentId,
    courseId,
    enrollmentId,
    date,
    status,
    remarks
) => {

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

    const enrollment = await Enrollment.findOne({
        _id: enrollmentId,
        student: studentId,
        course: courseId,
    });

    if (!enrollment) {
        const error = new Error(
            "Valid enrollment not found for this student and course"
        );
        error.statusCode = 404;
        throw error;
    }

    if (
        enrollment.status === "cancelled" ||
        enrollment.status === "rejected"
    ) {
        const error = new Error(
            "Attendance cannot be marked for this enrollment"
        );
        error.statusCode = 400;
        throw error;
    }

    const attendanceDate = date
        ? new Date(date)
        : new Date();

    attendanceDate.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
        student: studentId,
        course: courseId,
        date: attendanceDate,
    });

    if (existingAttendance) {
        const error = new Error(
            "Attendance already exists for this student on this date"
        );
        error.statusCode = 409;
        throw error;
    }

    const attendance = await Attendance.create({
        student: studentId,
        course: courseId,
        enrollment: enrollmentId,
        date: attendanceDate,
        status: status || "present",
        markedBy,
        remarks: remarks || "",
    });

    return await Attendance.findById(attendance._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        );
};


const getMyAttendance = async (studentId) => {

    return await Attendance.find({
        student: studentId,
    })
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        )
        .sort({
            date: -1,
        });
};


const getAttendanceById = async (
    attendanceId,
    userId,
    role
) => {

    const attendance = await Attendance.findById(
        attendanceId
    )
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        );


    if (!attendance) {
        const error = new Error("Attendance not found");
        error.statusCode = 404;
        throw error;
    }


    // Student can only view their own attendance
    if (
        role === "student" &&
        attendance.student._id.toString() !== userId.toString()
    ) {
        const error = new Error(
            "You are not authorized to view this attendance"
        );
        error.statusCode = 403;
        throw error;
    }


    return attendance;
};


const getAllAttendance = async () => {

    return await Attendance.find()
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        )
        .sort({
            date: -1,
        });
};


const getCourseAttendance = async (
    courseId
) => {

    const course = await Course.findById(courseId);

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }


    return await Attendance.find({
        course: courseId,
    })
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        )
        .sort({
            date: -1,
        });
};


const updateAttendance = async (
    attendanceId,
    status,
    date,
    remarks
) => {

    const attendance = await Attendance.findById(
        attendanceId
    );

    if (!attendance) {
        const error = new Error("Attendance not found");
        error.statusCode = 404;
        throw error;
    }


    if (status !== undefined) {
        attendance.status = status;
    }


    if (date !== undefined) {
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            _id: { $ne: attendanceId },
            student: attendance.student,
            course: attendance.course,
            date: attendanceDate,
        });

        if (existingAttendance) {
            const error = new Error(
                "Attendance already exists for this student on this date"
            );
            error.statusCode = 409;
            throw error;
        }

        attendance.date = attendanceDate;
    }


    if (remarks !== undefined) {
        attendance.remarks = remarks;
    }


    await attendance.save();


    return await Attendance.findById(
        attendance._id
    )
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "markedBy",
            "firstName lastName email role"
        );
};


const attendanceService = {
    createAttendance,
    getMyAttendance,
    getAttendanceById,
    getAllAttendance,
    getCourseAttendance,
    updateAttendance,
};

export default attendanceService;