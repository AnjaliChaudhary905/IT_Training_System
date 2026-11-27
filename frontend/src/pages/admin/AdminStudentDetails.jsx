import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    ArrowLeft,
    Edit,
    Mail,
    Phone,
    User,
    CalendarDays,
    ShieldCheck,
    ShieldX,
    UserCheck,
    UserX,
    BookOpen,
    Clock3,
    CircleDollarSign,
} from "lucide-react";

import studentServices from "../../services/studentService";
import enrollmentServices from "../../services/enrollmentService";

const AdminStudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [enrollments, setEnrollments] = useState([]);
    const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);

    const [statusLoading, setStatusLoading] = useState(false);

    // Fetch student details
    useEffect(() => {
        const loadStudent = async () => {
            try {
                setLoading(true);

                const response =
                    await studentServices.getStudentById(id);

                if (response.success) {
                    setStudent(response.data);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch student:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                        "Failed to fetch student details"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadStudent();
        }
    }, [id]);

    // Fetch student enrollments
    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                setEnrollmentsLoading(true);

                const response =
                    await enrollmentServices.getEnrollmentsByStudent(
                        id
                    );

                if (response.success) {
                    setEnrollments(response.data || []);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch student enrollments:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                        "Failed to fetch student enrollments"
                );
            } finally {
                setEnrollmentsLoading(false);
            }
        };

        if (id) {
            loadEnrollments();
        }
    }, [id]);

    // Toggle student status
    const handleStatusToggle = async () => {
        if (!student) return;

        try {
            setStatusLoading(true);

            const newStatus = !student.isActive;

            const response =
                await studentServices.updateStudentStatus(
                    student._id,
                    newStatus
                );

            if (response.success) {
                setStudent(response.data);

                toast.success(
                    newStatus
                        ? "Student activated successfully"
                        : "Student deactivated successfully"
                );
            }
        } catch (error) {
            console.error(
                "Failed to update student status:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    "Failed to update student status"
            );
        } finally {
            setStatusLoading(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                    <p className="mt-3 text-sm text-slate-500">
                        Loading student details...
                    </p>
                </div>
            </div>
        );
    }

    // Student not found
    if (!student) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <User className="h-8 w-8 text-slate-400" />
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-slate-800">
                        Student Not Found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        The requested student could not be found.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/admin/students")
                        }
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Students
                    </button>
                </div>
            </div>
        );
    }

    const fullName =
        `${student.firstName || ""} ${student.lastName || ""}`.trim();

    const initials =
        `${student.firstName?.charAt(0) || ""}${student.lastName?.charAt(0) || ""}`.toUpperCase();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <button
                        onClick={() =>
                            navigate("/admin/students")
                        }
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Students
                    </button>

                    <h1 className="text-2xl font-bold text-slate-800">
                        Student Details
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View student profile, account information,
                        and enrollments.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() =>
                            navigate(
                                `/admin/students/edit/${student._id}`
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        <Edit className="h-4 w-4" />
                        Edit Student
                    </button>

                    <button
                        onClick={handleStatusToggle}
                        disabled={statusLoading}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            student.isActive
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {student.isActive ? (
                            <>
                                <UserX className="h-4 w-4" />
                                {statusLoading
                                    ? "Deactivating..."
                                    : "Deactivate"}
                            </>
                        ) : (
                            <>
                                <UserCheck className="h-4 w-4" />
                                {statusLoading
                                    ? "Activating..."
                                    : "Activate"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Profile Header */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-800" />

                <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                            {/* Avatar */}
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-indigo-100 shadow-md">
                                {student.avatar ? (
                                    <img
                                        src={student.avatar}
                                        alt={fullName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-indigo-600">
                                        {initials || "ST"}
                                    </span>
                                )}
                            </div>

                            <div className="pb-1">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {fullName || "Unnamed Student"}
                                </h2>

                                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                    <span>Student</span>

                                    <span>•</span>

                                    <span>
                                        {student.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status badges */}
                        <div className="flex flex-wrap gap-2">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                                    student.isActive
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-700"
                                }`}
                            >
                                {student.isActive ? (
                                    <UserCheck className="h-3.5 w-3.5" />
                                ) : (
                                    <UserX className="h-3.5 w-3.5" />
                                )}

                                {student.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                                    student.isVerified
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-amber-50 text-amber-700"
                                }`}
                            >
                                {student.isVerified ? (
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                ) : (
                                    <ShieldX className="h-3.5 w-3.5" />
                                )}

                                {student.isVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Personal Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Personal Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Student contact and profile information.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Email */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                                <Mail className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Email Address
                                </p>

                                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                    {student.email || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                <Phone className="h-5 w-5 text-emerald-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Phone Number
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {student.phone || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                                <User className="h-5 w-5 text-violet-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Full Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {fullName || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Status */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Account Status
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Current account and verification status.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Active Status */}
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                {student.isActive ? (
                                    <UserCheck className="h-5 w-5 text-emerald-600" />
                                ) : (
                                    <UserX className="h-5 w-5 text-red-600" />
                                )}

                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        Account Status
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Whether the student can access
                                        the system.
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    student.isActive
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {student.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>
                        </div>

                        {/* Verification */}
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                {student.isVerified ? (
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                ) : (
                                    <ShieldX className="h-5 w-5 text-amber-600" />
                                )}

                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        Email Verification
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Student verification status.
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    student.isVerified
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                            >
                                {student.isVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Account Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Important account dates and details.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Created At */}
                    <div className="rounded-lg bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-indigo-600" />

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Account Created
                            </p>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                            {student.createdAt
                                ? new Date(
                                      student.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>

                    {/* Last Login */}
                    <div className="rounded-lg bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-emerald-600" />

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Last Login
                            </p>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                            {student.lastLogin
                                ? new Date(
                                      student.lastLogin
                                  ).toLocaleDateString()
                                : "Never"}
                        </p>
                    </div>

                    {/* Student ID */}
                    <div className="rounded-lg bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-violet-600" />

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Student ID
                            </p>
                        </div>

                        <p className="mt-2 truncate text-sm font-semibold text-slate-700">
                            {student._id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Enrollment Details */}
            <div>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                            Enrollment Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Courses enrolled by this student.
                        </p>
                    </div>

                    {!enrollmentsLoading && (
                        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                            {enrollments.length}{" "}
                            {enrollments.length === 1
                                ? "Course"
                                : "Courses"}
                        </span>
                    )}
                </div>

                {/* Enrollment Loading */}
                {enrollmentsLoading ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                        <p className="mt-3 text-sm text-slate-500">
                            Loading enrollment details...
                        </p>
                    </div>
                ) : enrollments.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <BookOpen className="mx-auto h-10 w-10 text-slate-400" />

                        <h3 className="mt-3 text-base font-semibold text-slate-700">
                            No Enrollments
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            This student has not enrolled in any
                            courses yet.
                        </p>
                    </div>
                ) : (
                    /* Enrollment Cards */
                    <div className="space-y-4">
                        {enrollments.map((enrollment) => {
                            const course = enrollment.course;

                            const statusStyles = {
                                completed:
                                    "bg-emerald-50 text-emerald-700 border-emerald-200",
                                cancelled:
                                    "bg-red-50 text-red-700 border-red-200",
                                approved:
                                    "bg-blue-50 text-blue-700 border-blue-200",
                                pending:
                                    "bg-amber-50 text-amber-700 border-amber-200",
                            };

                            const statusClass =
                                statusStyles[
                                    enrollment.status
                                ] ||
                                "bg-slate-50 text-slate-700 border-slate-200";

                            const progress =
                                Number(
                                    enrollment.progress
                                ) || 0;

                            return (
                                <div
                                    key={enrollment._id}
                                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                >
                                    {/* Course Header */}
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex min-w-0 gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                                                <BookOpen className="h-6 w-6 text-indigo-600" />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="text-lg font-semibold text-slate-800">
                                                    {course?.title ||
                                                        "Course unavailable"}
                                                </h3>

                                                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                                    {course?.category && (
                                                        <span>
                                                            {
                                                                course.category
                                                            }
                                                        </span>
                                                    )}

                                                    {course?.category &&
                                                        course?.level && (
                                                            <span>
                                                                •
                                                            </span>
                                                        )}

                                                    {course?.level && (
                                                        <span>
                                                            {
                                                                course.level
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
                                        >
                                            {enrollment.status ||
                                                "pending"}
                                        </span>
                                    </div>

                                    {/* Enrollment Information */}
                                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                                        {/* Enrollment Date */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Enrollment Date
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                                                <CalendarDays className="h-4 w-4 text-slate-400" />

                                                {enrollment.enrollmentDate
                                                    ? new Date(
                                                          enrollment.enrollmentDate
                                                      ).toLocaleDateString()
                                                    : "N/A"}
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Duration
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                                                <Clock3 className="h-4 w-4 text-slate-400" />

                                                {course?.duration ||
                                                    "N/A"}
                                            </div>
                                        </div>

                                        {/* Fee */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Course Fee
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                                                <CircleDollarSign className="h-4 w-4 text-slate-400" />

                                                NPR{" "}
                                                {typeof course?.fee ===
                                                "number"
                                                    ? course.fee.toLocaleString()
                                                    : "0"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-5 border-t border-slate-100 pt-5">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-700">
                                                Course Progress
                                            </span>

                                            <span className="text-sm font-semibold text-indigo-600">
                                                {progress}%
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-indigo-600 transition-all"
                                                style={{
                                                    width: `${Math.min(
                                                        Math.max(
                                                            progress,
                                                            0
                                                        ),
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStudentDetails;