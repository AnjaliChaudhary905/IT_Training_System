
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    ClipboardCheck,
    UserRound,
    ArrowRight,
    Users,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { getInstructorDashboard } from "../../services/dashboardService";
import useAuth from "../../hooks/useAuth";

const InstructorDashboard = () => {
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const fetchDashboard = async () => {
            try {
                const response = await getInstructorDashboard();

                if (!ignore) {
                    setDashboard(response.data);
                }
            } catch (error) {
                if (!ignore) {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load dashboard"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchDashboard();

        return () => {
            ignore = true;
        };
    }, []);

    const overview = dashboard?.overview;
    const attendance = dashboard?.attendance;
    const recentEnrollments = dashboard?.recentEnrollments || [];

    const dashboardItems = [
        {
            title: "My Courses",
            description:
                "View the courses assigned to you and manage your training activities.",
            path: "/instructor/courses",
            icon: BookOpen,
        },
        {
            title: "Attendance",
            description:
                "Review and manage attendance records for your enrolled students.",
            path: "/instructor/attendance",
            icon: ClipboardCheck,
        },
        {
            title: "My Profile",
            description:
                "View and update your instructor profile information.",
            path: "/instructor/profile",
            icon: UserRound,
        },
    ];

    const stats = [
        {
            title: "Assigned Courses",
            value: overview?.totalCourses ?? 0,
            icon: BookOpen,
            color: "bg-blue-50 text-blue-700",
        },
        {
            title: "Total Students",
            value: overview?.totalStudents ?? 0,
            icon: Users,
            color: "bg-emerald-50 text-emerald-700",
        },
        {
            title: "Total Enrollments",
            value: overview?.totalEnrollments ?? 0,
            icon: ClipboardCheck,
            color: "bg-purple-50 text-purple-700",
        },
        {
            title: "Pending Enrollments",
            value: overview?.pendingEnrollments ?? 0,
            icon: Clock,
            color: "bg-amber-50 text-amber-700",
        },
    ];

    const getStatusStyle = (status) => {
        const styles = {
            pending: "bg-amber-100 text-amber-700",
            approved: "bg-blue-100 text-blue-700",
            completed: "bg-emerald-100 text-emerald-700",
            rejected: "bg-red-100 text-red-700",
            cancelled: "bg-gray-100 text-gray-700",
        };

        return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F5A623]" />
                    <p className="mt-4 text-sm text-gray-500">
                        Loading instructor dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <div>
                <p className="text-sm font-medium text-[#B87A16]">
                    INSTRUCTOR PORTAL
                </p>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your courses, students, and training activities
                    from one place.
                </p>
            </div>

            {/* Welcome Section */}
            <div className="rounded-2xl bg-[#071B41] p-6 text-white sm:p-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-medium text-[#F5A623]">
                        Welcome to Sipalaya
                    </p>

                    <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                        Hello, {user?.firstName || "Instructor"}!
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                        Manage your assigned courses, monitor student
                        progress, review attendance, and stay updated
                        with your training activities.
                    </p>
                </div>
            </div>

            {/* Overview Statistics */}
            <section>
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        A quick summary of your teaching activities.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
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

                                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </h3>
                                    </div>

                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                                        <Icon size={23} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Attendance Overview */}
            <section>
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Attendance Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Attendance records across your assigned courses.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-100 p-3 text-gray-700">
                                <ClipboardCheck size={21} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Records
                                </p>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {attendance?.total ?? 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
                                <CheckCircle size={21} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Present
                                </p>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {attendance?.present ?? 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-red-50 p-3 text-red-700">
                                <XCircle size={21} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Absent
                                </p>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {attendance?.absent ?? 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-amber-50 p-3 text-amber-700">
                                <Clock size={21} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Late
                                </p>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {attendance?.late ?? 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Recent Enrollments */}
            <section>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Enrollments
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Latest student enrollment activity in your courses.
                        </p>
                    </div>

                    <Link
                        to="/instructor/courses"
                        className="flex items-center gap-2 text-sm font-semibold text-[#B87A16] hover:text-[#071B41]"
                    >
                        View Courses
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {recentEnrollments.length === 0 ? (
                        <div className="p-8 text-center">
                            <Users className="mx-auto text-gray-400" size={35} />

                            <p className="mt-3 font-medium text-gray-700">
                                No enrollments found
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Student enrollments will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Student
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Course
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Enrollment Date
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {recentEnrollments.map((enrollment) => (
                                        <tr key={enrollment._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {enrollment.student
                                                        ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
                                                        : "Student unavailable"}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {enrollment.student?.email || "N/A"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-700">
                                                {enrollment.course?.title || "Course unavailable"}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-500">
                                                {formatDate(enrollment.enrollmentDate)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(enrollment.status)}`}>
                                                    {enrollment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick Access */}
            <section>
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Quick Access
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Navigate to the main areas of your portal.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {dashboardItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="group rounded-xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#F5A623] hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B41]/5 text-[#071B41] transition group-hover:bg-[#F5A623]/20">
                                        <Icon size={23} />
                                    </div>

                                    <ArrowRight
                                        size={20}
                                        className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#B87A16]"
                                    />
                                </div>

                                <h3 className="mt-5 text-base font-semibold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {item.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

        </div>
    );
};

export default InstructorDashboard;
