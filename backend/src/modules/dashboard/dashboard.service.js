import Attendance from "../attendance/attendance.model.js";
import Contact from "../contact/contact.model.js";
import Course from "../courses/course.model.js";
import Enrollment from "../enrollment/enrollment.model.js";
import Payment from "../payments/payment.model.js";
import User from "../users/user.model.js";


const getAdminDashboard = async () => {

    const [
        totalStudents,
        totalInstructors,
        totalCourses,
        totalEnrollments,
    ] = await Promise.all([
        User.countDocuments({
            role: "student",
        }),

        User.countDocuments({
            role: "instructor",
        }),

        Course.countDocuments(),

        Enrollment.countDocuments(),
    ]);

    const [
        pendingEnrollments,
        approvedEnrollments,
        rejectedEnrollments,
        cancelledEnrollments,
        completedEnrollments,
    ] = await Promise.all([
        Enrollment.countDocuments({
            status: "pending",
        }),

        Enrollment.countDocuments({
            status: "approved",
        }),

        Enrollment.countDocuments({
            status: "rejected",
        }),

        Enrollment.countDocuments({
            status: "cancelled",
        }),

        Enrollment.countDocuments({
            status: "completed",
        }),
    ]);

    const [
        totalPayments,
        paidPayments,
        pendingPayments,
        failedPayments,
        refundedPayments,
    ] = await Promise.all([
        Payment.countDocuments(),

        Payment.countDocuments({
            status: "paid",
        }),

        Payment.countDocuments({
            status: "pending",
        }),

        Payment.countDocuments({
            status: "failed",
        }),

        Payment.countDocuments({
            status: "refunded",
        }),
    ]);

    const revenueResult = await Payment.aggregate([
        {
            $match: {
                status: "paid",
            },
        },

        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$amount",
                },
            },
        },
    ]);


    const totalRevenue =
        revenueResult.length > 0
            ? revenueResult[0].totalRevenue
            : 0;

    const [
        presentAttendance,
        absentAttendance,
        lateAttendance,
    ] = await Promise.all([
        Attendance.countDocuments({
            status: "present",
        }),

        Attendance.countDocuments({
            status: "absent",
        }),

        Attendance.countDocuments({
            status: "late",
        }),
    ]);

    const recentEnrollments = await Enrollment.find()
        .populate(
            "student",
            "firstName lastName email"
        )
        .populate(
            "course",
            "title fee"
        )
        .sort({
            createdAt: -1,
        })
        .limit(5);

    const recentPayments = await Payment.find()
        .populate(
            "student",
            "firstName lastName email"
        )
        .populate(
            "course",
            "title"
        )
        .sort({
            createdAt: -1,
        })
        .limit(5);
    const recentMessages = await Contact.find()
        .sort({
            createdAt: -1,
        })
        .limit(5);

    return {
        overview: {
            totalStudents,
            totalInstructors,
            totalCourses,
            totalEnrollments,
        },

        enrollments: {
            pending: pendingEnrollments,
            approved: approvedEnrollments,
            rejected: rejectedEnrollments,
            cancelled: cancelledEnrollments,
            completed: completedEnrollments,
        },

        payments: {
            totalPayments,
            paid: paidPayments,
            pending: pendingPayments,
            failed: failedPayments,
            refunded: refundedPayments,
            totalRevenue,
        },

        attendance: {
            present: presentAttendance,
            absent: absentAttendance,
            late: lateAttendance,
        },

        recentEnrollments,
        recentPayments,
        recentMessages,
    };
};

const getInstructorDashboard = async (instructorId) => {
    // Find only courses assigned to the logged-in instructor.
    const assignedCourses = await Course.find({
        instructor: instructorId,
    }).select("_id title");

    const courseIds = assignedCourses.map((course) => course._id);

    // If no courses are assigned, return zero statistics.
    if (courseIds.length === 0) {
        return {
            overview: {
                totalCourses: 0,
                totalStudents: 0,
                totalEnrollments: 0,
                pendingEnrollments: 0,
            },
            attendance: {
                present: 0,
                absent: 0,
                late: 0,
                total: 0,
            },
            recentEnrollments: [],
        };
    }

    const courseFilter = {
        course: { $in: courseIds },
    };

    const [
        totalEnrollments,
        pendingEnrollments,
        studentIds,
        presentAttendance,
        absentAttendance,
        lateAttendance,
        recentEnrollments,
    ] = await Promise.all([
        Enrollment.countDocuments(courseFilter),

        Enrollment.countDocuments({
            ...courseFilter,
            status: "pending",
        }),

        Enrollment.distinct("student", {
            ...courseFilter,
            status: {
                $nin: ["rejected", "cancelled"],
            },
        }),

        Attendance.countDocuments({
            ...courseFilter,
            status: "present",
        }),

        Attendance.countDocuments({
            ...courseFilter,
            status: "absent",
        }),

        Attendance.countDocuments({
            ...courseFilter,
            status: "late",
        }),

        Enrollment.find(courseFilter)
            .populate("student", "firstName lastName email")
            .populate("course", "title")
            .sort({ createdAt: -1 })
            .limit(5),
    ]);

    return {
        overview: {
            totalCourses: assignedCourses.length,
            totalStudents: studentIds.length,
            totalEnrollments,
            pendingEnrollments,
        },

        attendance: {
            present: presentAttendance,
            absent: absentAttendance,
            late: lateAttendance,
            total:
                presentAttendance +
                absentAttendance +
                lateAttendance,
        },

        recentEnrollments,
    };
};


const dashboardService = {
    getAdminDashboard,
    getInstructorDashboard,
};


export default dashboardService;