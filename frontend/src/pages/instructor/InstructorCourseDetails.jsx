
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Clock,
    IndianRupee,
    Users,
    GraduationCap,
    RefreshCw,
    AlertCircle,
    Mail,
    Phone,
    CalendarDays,
    CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import courseServices from "../../services/courseService";
import enrollmentServices from "../../services/enrollmentService";

// Format date
const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// Get student initials
const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
        .toUpperCase() || "S";
};

// Enrollment status badge
const getStatusClasses = (status) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";

        case "approved":
            return "bg-blue-100 text-blue-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        case "rejected":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
};

const InstructorCourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [enrollments, setEnrollments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // Tracks the enrollment currently being updated
    const [updatingEnrollmentId, setUpdatingEnrollmentId] =
        useState(null);

    // Fetch course and enrollment details
    const loadCourseDetails = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const [courseResponse, enrollmentResponse] =
                await Promise.all([
                    courseServices.getCourseById(courseId),
                    enrollmentServices.getEnrollmentsByCourse(courseId),
                ]);

            setCourse(courseResponse.data);
            setEnrollments(enrollmentResponse.data || []);
        } catch (err) {
            console.error("Error fetching course details:", err);

            const message =
                err.response?.data?.message ||
                "Unable to load course details.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [courseId]);

    // Update enrollment status
    const handleEnrollmentStatusUpdate = async (
        enrollmentId,
        status
    ) => {
        try {
            setUpdatingEnrollmentId(enrollmentId);

            const response =
                await enrollmentServices.updateEnrollmentStatus(
                    enrollmentId,
                    status
                );

            const updatedEnrollment = response.data;

            // Update the particular enrollment in the table
            setEnrollments((previousEnrollments) =>
                previousEnrollments.map((enrollment) =>
                    enrollment._id === enrollmentId
                        ? updatedEnrollment
                        : enrollment
                )
            );

            const successMessages = {
                approved: "Student enrollment approved successfully",
                rejected: "Student enrollment rejected successfully",
                completed: "Student marked as completed successfully",
            };

            toast.success(
                successMessages[status] ||
                "Enrollment status updated successfully"
            );
        } catch (err) {
            console.error("Error updating enrollment status:", err);

            toast.error(
                err.response?.data?.message ||
                "Unable to update enrollment status"
            );
        } finally {
            setUpdatingEnrollmentId(null);
        }
    };

    // Load page data
    useEffect(() => {
        const fetchCourseDetails = async () => {
            await loadCourseDetails();
        };

        fetchCourseDetails();
    }, [loadCourseDetails]);

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-20">
                <RefreshCw
                    size={32}
                    className="animate-spin text-[#B87A16]"
                />

                <p className="mt-4 text-sm text-gray-500">
                    Loading course details...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                <AlertCircle
                    size={32}
                    className="mx-auto text-red-500"
                />

                <h2 className="mt-3 font-semibold text-red-700">
                    Failed to load course details
                </h2>

                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>

                <div className="mt-5 flex justify-center gap-3">
                    <button
                        onClick={() => navigate("/instructor/courses")}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => loadCourseDetails()}
                        className="rounded-lg bg-[#071B41] px-4 py-2 text-sm text-white"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Course not found
    if (!course) {
        return (
            <div className="rounded-xl bg-white p-10 text-center">
                <h2 className="font-semibold text-gray-800">
                    Course not found
                </h2>

                <button
                    onClick={() => navigate("/instructor/courses")}
                    className="mt-4 text-sm font-medium text-[#B87A16]"
                >
                    Back to My Courses
                </button>
            </div>
        );
    }

    // Course statistics
    const completedCount = enrollments.filter(
        (item) => item.status === "completed"
    ).length;

    const averageProgress = enrollments.length
        ? Math.round(
            enrollments.reduce(
                (total, item) => total + (Number(item.progress) || 0),
                0
            ) / enrollments.length
        )
        : 0;

    return (
        <div className="space-y-7">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <button
                        onClick={() => navigate("/instructor/courses")}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#B87A16]"
                    >
                        <ArrowLeft size={17} />
                        Back to My Courses
                    </button>

                    <p className="text-sm font-medium text-[#B87A16]">
                        INSTRUCTOR PORTAL
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Course Details
                    </h1>
                </div>

                <button
                    onClick={() => loadCourseDetails(true)}
                    disabled={refreshing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                    <RefreshCw
                        size={17}
                        className={refreshing ? "animate-spin" : ""}
                    />
                    Refresh
                </button>
            </div>

            {/* Course Overview */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-5">

                    {/* Course Image */}
                    <div className="min-h-64 bg-gray-100 lg:col-span-2">
                        {course.image?.url ? (
                            <img
                                src={course.image.url}
                                alt={course.title}
                                className="h-full min-h-64 w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full min-h-64 items-center justify-center text-gray-400">
                                <BookOpen size={65} />
                            </div>
                        )}
                    </div>

                    {/* Course Information */}
                    <div className="p-6 lg:col-span-3 lg:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-[#071B41]/5 px-3 py-1 text-xs font-medium text-[#071B41]">
                                {course.category}
                            </span>

                            <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                {course.level}
                            </span>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    course.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {course.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                            {course.title}
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-gray-600">
                            {course.description || "No description available."}
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="flex items-center gap-3">
                                <Clock className="text-[#B87A16]" size={20} />

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Duration
                                    </p>

                                    <p className="text-sm font-medium text-gray-800">
                                        {course.duration || "Not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <IndianRupee className="text-[#B87A16]" size={20} />

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Course Fee
                                    </p>

                                    <p className="text-sm font-medium text-gray-800">
                                        {Number(course.fee || 0).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <BookOpen className="text-[#B87A16]" size={20} />

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Syllabus Topics
                                    </p>

                                    <p className="text-sm font-medium text-gray-800">
                                        {course.syllabus?.length || 0}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <CalendarDays className="text-[#B87A16]" size={20} />

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Created Date
                                    </p>

                                    <p className="text-sm font-medium text-gray-800">
                                        {formatDate(course.createdAt)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Course Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                            <Users size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Enrolled Students
                            </p>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {enrollments.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-700">
                            <GraduationCap size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Completed Students
                            </p>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {completedCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                            <CheckCircle size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Average Progress
                            </p>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {averageProgress}%
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Syllabus */}
            {course.syllabus?.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Course Syllabus
                    </h2>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {course.syllabus.map((topic, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#071B41] text-xs font-semibold text-white">
                                    {index + 1}
                                </span>

                                <p className="text-sm text-gray-700">
                                    {typeof topic === "string"
                                        ? topic
                                        : topic.title || topic.name || "Syllabus topic"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Enrolled Students */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                <div className="border-b border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Enrolled Students
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage student enrollment status and view their progress.
                    </p>
                </div>

                {enrollments.length === 0 ? (
                    <div className="px-6 py-14 text-center">
                        <Users
                            size={38}
                            className="mx-auto text-gray-300"
                        />

                        <h3 className="mt-4 font-semibold text-gray-800">
                            No students enrolled yet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Students will appear here when they enroll in this course.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">

                            <thead className="bg-gray-50">
                                <tr className="text-xs uppercase tracking-wider text-gray-500">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Enrollment</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {enrollments.map((enrollment) => {
                                    const student = enrollment.student || {};

                                    const progress = Math.min(
                                        100,
                                        Math.max(
                                            0,
                                            Number(enrollment.progress) || 0
                                        )
                                    );

                                    const isUpdating =
                                        updatingEnrollmentId === enrollment._id;

                                    return (
                                        <tr
                                            key={enrollment._id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            {/* Student */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    {student.avatar ? (
                                                        <img
                                                            src={student.avatar}
                                                            alt={student.firstName}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071B41] text-xs font-semibold text-white">
                                                            {getInitials(
                                                                student.firstName,
                                                                student.lastName
                                                            )}
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {student.firstName}{" "}
                                                            {student.lastName}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {student.isActive
                                                                ? "Active account"
                                                                : "Inactive account"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-6 py-5">
                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Mail size={14} />
                                                        {student.email || "No email"}
                                                    </p>

                                                    <p className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Phone size={14} />
                                                        {student.phone || "No phone"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Progress */}
                                            <td className="px-6 py-5">
                                                <div className="w-32">
                                                    <div className="mb-2 flex justify-between">
                                                        <span className="text-xs font-semibold text-gray-700">
                                                            {progress}%
                                                        </span>
                                                    </div>

                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                        <div
                                                            className="h-full rounded-full bg-[#B87A16]"
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Enrollment Date */}
                                            <td className="px-6 py-5">
                                                <p className="text-sm text-gray-700">
                                                    {formatDate(enrollment.enrollmentDate)}
                                                </p>

                                                {enrollment.completedAt && (
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Completed:{" "}
                                                        {formatDate(enrollment.completedAt)}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                                        enrollment.status
                                                    )}`}
                                                >
                                                    {enrollment.status}
                                                </span>
                                            </td>

                                            {/* Enrollment Actions */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-wrap items-center gap-2">

                                                    {enrollment.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    handleEnrollmentStatusUpdate(
                                                                        enrollment._id,
                                                                        "approved"
                                                                    )
                                                                }
                                                                disabled={isUpdating}
                                                                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {isUpdating
                                                                    ? "Updating..."
                                                                    : "Approve"}
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleEnrollmentStatusUpdate(
                                                                        enrollment._id,
                                                                        "rejected"
                                                                    )
                                                                }
                                                                disabled={isUpdating}
                                                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {isUpdating
                                                                    ? "Updating..."
                                                                    : "Reject"}
                                                            </button>
                                                        </>
                                                    )}

                                                    {enrollment.status === "approved" && (
                                                        <button
                                                            onClick={() =>
                                                                handleEnrollmentStatusUpdate(
                                                                    enrollment._id,
                                                                    "completed"
                                                                )
                                                            }
                                                            disabled={isUpdating}
                                                            className="rounded-lg bg-[#071B41] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#102C5C] disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {isUpdating
                                                                ? "Updating..."
                                                                : "Mark Completed"}
                                                        </button>
                                                    )}

                                                    {[
                                                        "completed",
                                                        "rejected",
                                                        "cancelled",
                                                    ].includes(enrollment.status) && (
                                                        <span className="text-xs text-gray-400">
                                                            No actions available
                                                        </span>
                                                    )}

                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                )}

            </div>

        </div>
    );
};

export default InstructorCourseDetails;
