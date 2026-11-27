import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle,
    Clock,
    Mail,
    Phone,
    User,
    RefreshCw,
} from "lucide-react";

import enrollmentServices from "../../services/enrollmentService";

const AdminEnrollmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
    let cancelled = false;

    const fetchEnrollment = async () => {
        try {
            const response =
                await enrollmentServices.getEnrollmentById(id);

            if (!cancelled) {
                setEnrollment(response?.data || null);
                setLoading(false);
            }
        } catch (error) {
            console.error(
                "Failed to load enrollment:",
                error
            );

            if (!cancelled) {
                setError(
                    error?.response?.data?.message ||
                    "Failed to load enrollment"
                );

                setLoading(false);
            }
        }
    };

    fetchEnrollment();

    return () => {
        cancelled = true;
    };
}, [id]);

    const handleStatusChange = async (status) => {
        try {
            setUpdating(true);

            const response =
                await enrollmentServices.updateEnrollmentStatus(
                    id,
                    status
                );

            setEnrollment(response?.data || enrollment);
        } catch (error) {
            console.error(
                "Failed to update enrollment status:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to update enrollment status"
            );
        } finally {
            setUpdating(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "approved":
                return "bg-blue-100 text-blue-700";

            case "active":
                return "bg-green-100 text-green-700";

            case "completed":
                return "bg-purple-100 text-purple-700";

            case "cancelled":
            case "canceled":
            case "rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <RefreshCw
                        size={28}
                        className="mx-auto animate-spin text-[#071B41]"
                    />

                    <p className="mt-3 text-sm text-gray-500">
                        Loading enrollment...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !enrollment) {
        return (
            <div className="space-y-5">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/enrollments")
                    }
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#071B41]"
                >
                    <ArrowLeft size={17} />
                    Back to Enrollments
                </button>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <p className="font-medium text-red-700">
                        {error || "Enrollment not found"}
                    </p>
                </div>

            </div>
        );
    }

    const student = enrollment.student;
    const course = enrollment.course;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/enrollments")
                        }
                        className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#071B41]"
                    >
                        <ArrowLeft size={17} />
                        Back to Enrollments
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Enrollment Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage this student enrollment
                    </p>
                </div>

                <span
                    className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                        enrollment.status
                    )}`}
                >
                    {enrollment.status || "Pending"}
                </span>

            </div>

            {/* Student + Course */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* Student Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071B41] text-white">
                            <User size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Student Information
                            </h2>

                            <p className="text-xs text-gray-500">
                                Enrolled student
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Full Name
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {student?.firstName}{" "}
                                {student?.lastName}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail
                                size={17}
                                className="text-gray-400"
                            />

                            <div>
                                <p className="text-xs text-gray-400">
                                    Email
                                </p>

                                <p className="text-sm text-gray-700">
                                    {student?.email || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone
                                size={17}
                                className="text-gray-400"
                            />

                            <div>
                                <p className="text-xs text-gray-400">
                                    Phone
                                </p>

                                <p className="text-sm text-gray-700">
                                    {student?.phone || "-"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Course Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5A623] text-[#071B41]">
                            <BookOpen size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Course Information
                            </h2>

                            <p className="text-xs text-gray-500">
                                Enrolled course
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Course
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {course?.title || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Category
                            </p>

                            <p className="mt-1 text-sm text-gray-700">
                                {course?.category || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Level
                            </p>

                            <p className="mt-1 text-sm text-gray-700">
                                {course?.level || "-"}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Enrollment Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="font-semibold text-gray-900">
                        Enrollment Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enrollment progress and dates
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-lg bg-gray-50 p-4">
                        <CalendarDays
                            size={19}
                            className="text-[#071B41]"
                        />

                        <p className="mt-3 text-xs text-gray-400">
                            Enrollment Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {enrollment.enrollmentDate
                                ? new Date(
                                      enrollment.enrollmentDate
                                  ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <Clock
                            size={19}
                            className="text-[#071B41]"
                        />

                        <p className="mt-3 text-xs text-gray-400">
                            Progress
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {enrollment.progress || 0}%
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <CheckCircle
                            size={19}
                            className="text-[#071B41]"
                        />

                        <p className="mt-3 text-xs text-gray-400">
                            Completed Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {enrollment.completedAt
                                ? new Date(
                                      enrollment.completedAt
                                  ).toLocaleDateString()
                                : "Not completed"}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">

                        <p className="text-xs text-gray-400">
                            Current Status
                        </p>

                        <span
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                enrollment.status
                            )}`}
                        >
                            {enrollment.status || "Pending"}
                        </span>

                    </div>

                </div>

                {/* Progress Bar */}
                <div className="mt-7">

                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                            Course Progress
                        </p>

                        <p className="text-sm font-semibold text-[#071B41]">
                            {enrollment.progress || 0}%
                        </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-[#071B41] transition-all"
                            style={{
                                width: `${enrollment.progress || 0}%`,
                            }}
                        />
                    </div>

                </div>

            </div>

            {/* Admin Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="font-semibold text-gray-900">
                    Manage Enrollment
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Update the current enrollment status.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                    <button
                        type="button"
                        disabled={updating}
                        onClick={() =>
                            handleStatusChange("approved")
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        disabled={updating}
                        onClick={() =>
                            handleStatusChange("completed")
                        }
                        className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Mark Completed
                    </button>

                    <button
                        type="button"
                        disabled={updating}
                        onClick={() =>
                            handleStatusChange("rejected")
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Reject
                    </button>

                </div>

                {updating && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <RefreshCw
                            size={15}
                            className="animate-spin"
                        />
                        Updating enrollment...
                    </div>
                )}

            </div>

        </div>
    );
};

export default AdminEnrollmentDetails;