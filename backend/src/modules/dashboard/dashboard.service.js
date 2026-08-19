import Attendance from "../attendance/attendance.model.js";
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
    };
};


const dashboardService = {
    getAdminDashboard,
};


export default dashboardService;