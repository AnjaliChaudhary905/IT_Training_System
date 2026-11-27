import { useEffect, useState } from "react";

import {
    BookOpen,
    Users,
    UserRoundCog,
    ClipboardList,
    MessageSquare,
    TrendingUp,
    CreditCard,
    IndianRupee,
} from "lucide-react";

import { getAdminDashboard } from "../../services/dashboardService";

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);

                const response = await getAdminDashboard();

                if (response.success) {
                    setDashboard(response.data);
                }
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const statistics = [
        {
            title: "Total Courses",
            value: dashboard.overview.totalCourses,
            icon: BookOpen,
        },
        {
            title: "Total Students",
            value: dashboard.overview.totalStudents,
            icon: Users,
        },
        {
            title: "Total Instructors",
            value: dashboard.overview.totalInstructors,
            icon: UserRoundCog,
        },
        {
            title: "Total Enrollments",
            value: dashboard.overview.totalEnrollments,
            icon: ClipboardList,
        },
    ];

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of your IT Training Management System.
                </p>
            </div>


            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {statistics.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </h2>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#071B41]">
                                    <Icon size={22} />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>


            {/* Enrollment & Payment Overview */}
            <div className="grid gap-6 xl:grid-cols-2">

                {/* Enrollment Overview */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#071B41]">
                            <TrendingUp size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Enrollment Overview
                            </h2>

                            <p className="text-xs text-gray-500">
                                Current enrollment status
                            </p>
                        </div>

                    </div>


                    <div className="mt-6 space-y-4">

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Pending
                            </span>

                            <span className="font-semibold">
                                {dashboard.enrollments.pending}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Approved
                            </span>

                            <span className="font-semibold">
                                {dashboard.enrollments.approved}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Completed
                            </span>

                            <span className="font-semibold">
                                {dashboard.enrollments.completed}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Rejected
                            </span>

                            <span className="font-semibold">
                                {dashboard.enrollments.rejected}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Cancelled
                            </span>

                            <span className="font-semibold">
                                {dashboard.enrollments.cancelled}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Recent Messages */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#071B41]">
                                <MessageSquare size={20} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Messages
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Latest contact inquiries from visitors.
                                </p>
                            </div>

                        </div>

                    </div>

                    {dashboard.recentMessages.length === 0 ? (

                        <div className="flex min-h-32 items-center justify-center p-6">
                            <p className="text-sm text-gray-400">
                                No contact messages available.
                            </p>
                        </div>

                    ) : (

                        <div className="divide-y divide-gray-100">

                            {dashboard.recentMessages.map((message) => (

                                <div
                                    key={message._id}
                                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                                >

                                    <div className="min-w-0">

                                        <p className="font-medium text-gray-900">
                                            {message.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {message.email}
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-700">
                                            {message.subject}
                                        </p>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${message.status === "NEW"
                                                    ? "bg-blue-50 text-blue-600"
                                                    : message.status === "READ"
                                                        ? "bg-gray-100 text-gray-600"
                                                        : "bg-green-50 text-green-600"
                                                }`}
                                        >
                                            {message.status}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* Payment Overview */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#071B41]">
                            <CreditCard size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Payment Overview
                            </h2>

                            <p className="text-xs text-gray-500">
                                Payment statistics
                            </p>
                        </div>

                    </div>


                    <div className="mt-6 space-y-4">

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Total Payments
                            </span>

                            <span className="font-semibold">
                                {dashboard.payments.totalPayments}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Paid
                            </span>

                            <span className="font-semibold">
                                {dashboard.payments.paid}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Pending
                            </span>

                            <span className="font-semibold">
                                {dashboard.payments.pending}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Failed
                            </span>

                            <span className="font-semibold">
                                {dashboard.payments.failed}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                            <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                <IndianRupee size={15} />
                                Total Revenue
                            </span>

                            <span className="text-lg font-bold text-gray-900">
                                Rs. {dashboard.payments.totalRevenue}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Attendance Overview */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-900">
                    Attendance Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Overall attendance statistics.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Present
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {dashboard.attendance.present}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Absent
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {dashboard.attendance.absent}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Late
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {dashboard.attendance.late}
                        </p>
                    </div>

                </div>

            </div>


            {/* Recent Enrollments */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-200 p-6">

                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Enrollments
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Latest student enrollment activity.
                    </p>

                </div>

                {dashboard.recentEnrollments.length === 0 ? (

                    <div className="flex min-h-32 items-center justify-center p-6">
                        <p className="text-sm text-gray-400">
                            No enrollment data available yet.
                        </p>
                    </div>

                ) : (

                    <div className="divide-y divide-gray-100">

                        {dashboard.recentEnrollments.map((enrollment) => (

                            <div
                                key={enrollment._id}
                                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >

                                <div>
                                    <p className="font-medium text-gray-900">
                                        {enrollment.student?.firstName}{" "}
                                        {enrollment.student?.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {enrollment.course?.title}
                                    </p>
                                </div>

                                <span className="text-sm font-medium capitalize text-gray-600">
                                    {enrollment.status}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* Recent Payments */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-200 p-6">

                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Payments
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Latest payment activity.
                    </p>

                </div>

                {dashboard.recentPayments.length === 0 ? (

                    <div className="flex min-h-32 items-center justify-center p-6">
                        <p className="text-sm text-gray-400">
                            No payment data available yet.
                        </p>
                    </div>

                ) : (

                    <div className="divide-y divide-gray-100">

                        {dashboard.recentPayments.map((payment) => (

                            <div
                                key={payment._id}
                                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >

                                <div>
                                    <p className="font-medium text-gray-900">
                                        {payment.student?.firstName}{" "}
                                        {payment.student?.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {payment.course?.title}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">

                                    <p className="font-semibold text-gray-900">
                                        Rs. {payment.amount}
                                    </p>

                                    <p className="text-sm capitalize text-gray-500">
                                        {payment.status}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminDashboard;