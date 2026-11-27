import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    Search,
    RefreshCw,
    ClipboardList,
} from "lucide-react";

import enrollmentServices from "../../services/enrollmentService";

const AdminEnrollments = () => {

    const navigate = useNavigate();

    const [courseFilter, setCourseFilter] = useState("all");
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchEnrollments = async () => {
            try {

                const response =
                    await enrollmentServices.getAllEnrollments();

                if (!cancelled) {
                    setEnrollments(response?.data || []);
                    setLoading(false);
                }
            } catch (error) {
                console.error(
                    "Failed to load enrollments:",
                    error
                );

                if (!cancelled) {
                    setError(
                        error?.response?.data?.message ||
                        "Failed to load enrollments"
                    );

                    setLoading(false);
                }
            }
        };

        fetchEnrollments();

        return () => {
            cancelled = true;
        };
    }, []);


    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "approved":
                return "bg-blue-100 text-blue-700";

            case "completed":
                return "bg-purple-100 text-purple-700";

            case "rejected":
            case "cancelled":
            case "canceled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };
    const courses = [
        ...new Map(
            enrollments
                .filter((enrollment) => enrollment.course?._id)
                .map((enrollment) => [
                    enrollment.course._id,
                    enrollment.course,
                ])
        ).values(),
    ];

    const filteredEnrollments = enrollments.filter(
        (enrollment) => {
            const student = enrollment.student;
            const course = enrollment.course;

            const studentName =
                `${student?.firstName || ""} ${student?.lastName || ""
                    }`.toLowerCase();

            const studentEmail =
                student?.email?.toLowerCase() || "";

            const courseName =
                course?.title?.toLowerCase() || "";

            const search = searchTerm.toLowerCase();

            const matchesSearch =
                studentName.includes(search) ||
                studentEmail.includes(search) ||
                courseName.includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                enrollment.status?.toLowerCase() ===
                statusFilter;
            const matchesCourse =
                courseFilter === "all" ||
                enrollment.course?._id === courseFilter;
            return (
                matchesSearch &&
                matchesStatus &&
                matchesCourse
            );
        }
    );

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <RefreshCw
                        size={28}
                        className="mx-auto animate-spin text-[#071B41]"
                    />

                    <p className="mt-3 text-sm text-gray-500">
                        Loading enrollments...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Enrollments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage student course enrollments
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#071B41] text-white">
                    <ClipboardList size={21} />
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 md:flex-row">

                    {/* Search */}
                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search student or course..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                        />

                    </div>

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                    >
                        <option value="all">
                            All Statuses
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>
                    </select>
                    <select
                        value={courseFilter}
                        onChange={(event) =>
                            setCourseFilter(event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                    >
                        <option value="all">
                            All Courses
                        </option>

                        {courses.map((course) => (
                            <option
                                key={course._id}
                                value={course._id}
                            >
                                {course.title}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

            {/* Enrollment Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {filteredEnrollments.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                            <ClipboardList
                                size={25}
                                className="text-gray-400"
                            />
                        </div>

                        <h3 className="mt-4 font-semibold text-gray-900">
                            No enrollments found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            There are no enrollments matching
                            your search.
                        </p>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[850px]">

                            <thead className="border-b border-gray-200 bg-gray-50">

                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Student
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Course
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Enrollment Date
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Progress
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {filteredEnrollments.map(
                                    (enrollment) => {
                                        const student =
                                            enrollment.student;

                                        const course =
                                            enrollment.course;

                                        return (
                                            <tr
                                                key={
                                                    enrollment._id
                                                }
                                                className="transition hover:bg-gray-50"
                                            >

                                                {/* Student */}
                                                <td className="px-6 py-4">

                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {
                                                                student?.firstName
                                                            }{" "}
                                                            {
                                                                student?.lastName
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-gray-500">
                                                            {
                                                                student?.email
                                                            }
                                                        </p>
                                                    </div>

                                                </td>

                                                {/* Course */}
                                                <td className="px-6 py-4">

                                                    <p className="font-medium text-gray-800">
                                                        {
                                                            course?.title
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        {
                                                            course?.level
                                                        }
                                                    </p>

                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4 text-sm text-gray-600">

                                                    {enrollment.enrollmentDate
                                                        ? new Date(
                                                            enrollment.enrollmentDate
                                                        ).toLocaleDateString()
                                                        : "-"}

                                                </td>

                                                {/* Progress */}
                                                <td className="px-6 py-4">

                                                    <div className="w-28">

                                                        <div className="mb-1 flex justify-between">
                                                            <span className="text-xs text-gray-500">
                                                                Progress
                                                            </span>

                                                            <span className="text-xs font-semibold text-gray-700">
                                                                {
                                                                    enrollment.progress
                                                                }
                                                                %
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                                                            <div
                                                                className="h-full rounded-full bg-[#071B41]"
                                                                style={{
                                                                    width: `${enrollment.progress || 0}%`,
                                                                }}
                                                            />
                                                        </div>

                                                    </div>

                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                            enrollment.status
                                                        )}`}
                                                    >
                                                        {
                                                            enrollment.status ||
                                                            "Pending"
                                                        }
                                                    </span>

                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4 text-right">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/enrollments/${enrollment._id}`
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#071B41] hover:bg-[#071B41] hover:text-white"
                                                    >
                                                        <Eye
                                                            size={16}
                                                        />

                                                        View
                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* Result count */}
            <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                    {filteredEnrollments.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                    {enrollments.length}
                </span>{" "}
                enrollments
            </div>

        </div>
    );
};

export default AdminEnrollments;