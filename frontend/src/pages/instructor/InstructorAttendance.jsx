
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ClipboardCheck,
    RefreshCw,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    BookOpen,
    Search,
    Pencil,
    X,
    Save,
    Filter,
    Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import attendanceService from "../../services/attendanceService";
import courseServices from "../../services/courseService";
import enrollmentServices from "../../services/enrollmentService";

// Return today's date in local YYYY-MM-DD format
const getLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const InstructorAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Edit modal states
    const [editingAttendance, setEditingAttendance] = useState(null);
    const [editStatus, setEditStatus] = useState("present");
    const [editRemarks, setEditRemarks] = useState("");
    const [saving, setSaving] = useState(false);

    // Mark attendance modal states
    const [showMarkModal, setShowMarkModal] = useState(false);
    const [markCourseId, setMarkCourseId] = useState("");
    const [courseEnrollments, setCourseEnrollments] = useState([]);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("");
    const [attendanceDate, setAttendanceDate] = useState(getLocalDateString());
    const [newAttendanceStatus, setNewAttendanceStatus] = useState("present");
    const [newAttendanceRemarks, setNewAttendanceRemarks] = useState("");
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [creatingAttendance, setCreatingAttendance] = useState(false);

    // Fetch courses and attendance records
    const loadData = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const [courseResponse, attendanceResponse] =
                await Promise.all([
                    courseServices.getMyCourses(),
                    attendanceService.getAllAttendance(),
                ]);

            setCourses(courseResponse.data || []);
            setAttendance(attendanceResponse.data || []);
        } catch (err) {
            console.error("Error loading instructor attendance:", err);

            const message =
                err.response?.data?.message ||
                "Unable to load attendance records.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await loadData();
        };

        fetchData();
    }, [loadData]);

    // Attendance statistics
    const stats = useMemo(() => ({
        total: attendance.length,
        present: attendance.filter(
            (item) => item.status === "present"
        ).length,
        absent: attendance.filter(
            (item) => item.status === "absent"
        ).length,
        late: attendance.filter(
            (item) => item.status === "late"
        ).length,
    }), [attendance]);

    const statCards = [
        {
            title: "Total Records",
            value: stats.total,
            icon: ClipboardCheck,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Present",
            value: stats.present,
            icon: CheckCircle,
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Absent",
            value: stats.absent,
            icon: XCircle,
            color: "bg-red-50 text-red-600",
        },
        {
            title: "Late",
            value: stats.late,
            icon: Clock,
            color: "bg-amber-50 text-amber-600",
        },
    ];

    // Get student name
    const getStudentName = (student) => {
        if (!student) return "Unknown Student";

        return `${student.firstName || ""} ${student.lastName || ""}`.trim()
            || "Unknown Student";
    };

    // Get course title
    const getCourseTitle = (course) => {
        if (!course) return "Unknown Course";

        if (typeof course === "string") {
            const foundCourse = courses.find(
                (item) => item._id === course
            );

            return foundCourse?.title || "Unknown Course";
        }

        return course.title || "Unknown Course";
    };

    // Get course ID
    const getCourseId = (course) => {
        if (!course) return "";
        return typeof course === "string" ? course : course._id;
    };

    // Filter attendance records
    const filteredAttendance = useMemo(() => {
        return attendance.filter((record) => {
            const studentName = getStudentName(record.student).toLowerCase();
            const studentEmail = record.student?.email?.toLowerCase() || "";

            const matchesSearch =
                studentName.includes(searchTerm.toLowerCase()) ||
                studentEmail.includes(searchTerm.toLowerCase());

            const matchesCourse =
                selectedCourse === "all" ||
                getCourseId(record.course) === selectedCourse;

            const matchesStatus =
                selectedStatus === "all" ||
                record.status === selectedStatus;

            return matchesSearch && matchesCourse && matchesStatus;
        });
    }, [
        attendance,
        courses,
        searchTerm,
        selectedCourse,
        selectedStatus,
    ]);

    // Open edit modal
    const openEditModal = (record) => {
        setEditingAttendance(record);
        setEditStatus(record.status);
        setEditRemarks(record.remarks || "");
    };

    // Close edit modal
    const closeEditModal = () => {
        if (saving) return;

        setEditingAttendance(null);
        setEditStatus("present");
        setEditRemarks("");
    };

    // Update attendance
    const handleUpdateAttendance = async (e) => {
        e.preventDefault();

        if (!editingAttendance) return;

        try {
            setSaving(true);

            await attendanceService.updateAttendance(
                editingAttendance._id,
                {
                    status: editStatus,
                    remarks: editRemarks,
                }
            );

            toast.success("Attendance updated successfully.");

            setEditingAttendance(null);
            setEditRemarks("");

            await loadData(true);
        } catch (err) {
            console.error("Error updating attendance:", err);

            toast.error(
                err.response?.data?.message ||
                "Unable to update attendance."
            );
        } finally {
            setSaving(false);
        }
    };

    // Open Mark Attendance modal
    const openMarkModal = () => {
        setMarkCourseId("");
        setCourseEnrollments([]);
        setSelectedEnrollmentId("");
        setAttendanceDate(getLocalDateString());
        setNewAttendanceStatus("present");
        setNewAttendanceRemarks("");
        setShowMarkModal(true);
    };

    // Close Mark Attendance modal
    const closeMarkModal = () => {
        if (creatingAttendance) return;

        setShowMarkModal(false);
        setMarkCourseId("");
        setCourseEnrollments([]);
        setSelectedEnrollmentId("");
        setNewAttendanceRemarks("");
    };

    // Fetch enrolled students when a course is selected
    const handleMarkCourseChange = async (e) => {
        const courseId = e.target.value;

        setMarkCourseId(courseId);
        setCourseEnrollments([]);
        setSelectedEnrollmentId("");

        if (!courseId) return;

        try {
            setLoadingEnrollments(true);

            const response =
                await enrollmentServices.getEnrollmentsByCourse(courseId);

            // Only show valid, active student accounts
            const enrollments = (response.data || []).filter(
                (enrollment) =>
                    enrollment.student &&
                    enrollment.student.role === "student" &&
                    enrollment.student.isActive !== false
            );

            setCourseEnrollments(enrollments);
        } catch (err) {
            console.error("Error loading course enrollments:", err);

            toast.error(
                err.response?.data?.message ||
                "Unable to load students for this course."
            );
        } finally {
            setLoadingEnrollments(false);
        }
    };

    // Create a new attendance record
    const handleCreateAttendance = async (e) => {
        e.preventDefault();

        const selectedEnrollment = courseEnrollments.find(
            (enrollment) => enrollment._id === selectedEnrollmentId
        );

        if (!markCourseId || !selectedEnrollment) {
            toast.error("Please select a course and student.");
            return;
        }

        try {
            setCreatingAttendance(true);

            await attendanceService.createAttendance({
                studentId: selectedEnrollment.student._id,
                courseId: markCourseId,
                enrollmentId: selectedEnrollment._id,
                date: attendanceDate,
                status: newAttendanceStatus,
                remarks: newAttendanceRemarks.trim(),
            });

            toast.success("Attendance marked successfully.");

            setShowMarkModal(false);
            setMarkCourseId("");
            setCourseEnrollments([]);
            setSelectedEnrollmentId("");
            setNewAttendanceRemarks("");

            // Refresh attendance table and statistics
            await loadData(true);
        } catch (err) {
            console.error("Error creating attendance:", err);

            toast.error(
                err.response?.data?.message ||
                "Unable to mark attendance."
            );
        } finally {
            setCreatingAttendance(false);
        }
    };

    // Status badge
    const getStatusBadge = (status) => {
        const styles = {
            present: "bg-green-100 text-green-700",
            absent: "bg-red-100 text-red-700",
            late: "bg-amber-100 text-amber-700",
        };

        return (
            <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    styles[status] || "bg-gray-100 text-gray-700"
                }`}
            >
                {status || "Unknown"}
            </span>
        );
    };

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[#B87A16]">
                        INSTRUCTOR PORTAL
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Attendance Management
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View and manage attendance for your assigned courses.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Mark Attendance Button */}
                    <button
                        type="button"
                        onClick={openMarkModal}
                        disabled={loading || courses.length === 0}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#132A46] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Plus size={17} />
                        Mark Attendance
                    </button>

                    {/* Refresh Button */}
                    <button
                        type="button"
                        onClick={() => loadData(true)}
                        disabled={loading || refreshing}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#F5A623] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={17}
                            className={refreshing ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-gray-200 bg-white p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                                        <Icon size={23} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
                    <RefreshCw
                        size={30}
                        className="animate-spin text-[#B87A16]"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading attendance records...
                    </p>
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <AlertCircle
                        size={30}
                        className="mx-auto text-red-500"
                    />

                    <h3 className="mt-3 font-semibold text-red-700">
                        Failed to load attendance
                    </h3>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => loadData()}
                        className="mt-5 rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-medium text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Main Attendance Content */}
            {!loading && !error && (
                <>
                    {/* Assigned Courses Overview */}
                    {courses.length > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071B41]/5 text-[#071B41]">
                                    <BookOpen size={22} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Your Assigned Courses
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {courses.length} courses assigned to you
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                {courses.map((course) => (
                                    <span
                                        key={course._id}
                                        className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                                    >
                                        {course.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attendance Records */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center gap-3">
                                <Users
                                    size={22}
                                    className="text-[#B87A16]"
                                />

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Attendance Records
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {filteredAttendance.length} of {attendance.length} records
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Search */}
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Search student..."
                                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#B87A16]"
                                    />
                                </div>

                                {/* Course Filter */}
                                <div className="relative">
                                    <Filter
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <select
                                        value={selectedCourse}
                                        onChange={(e) =>
                                            setSelectedCourse(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#B87A16]"
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

                                {/* Status Filter */}
                                <select
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#B87A16]"
                                >
                                    <option value="all">
                                        All Statuses
                                    </option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        {filteredAttendance.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Student
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Course
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Remarks
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredAttendance.map((record) => (
                                            <tr
                                                key={record._id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-gray-900">
                                                        {getStudentName(record.student)}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {record.student?.email || "No email"}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {getCourseTitle(record.course)}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {record.date
                                                        ? new Date(record.date).toLocaleDateString()
                                                        : "—"}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {getStatusBadge(record.status)}
                                                </td>

                                                <td className="max-w-[180px] px-6 py-4 text-sm text-gray-600">
                                                    <span className="block truncate">
                                                        {record.remarks || "—"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(record)
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-[#B87A16] hover:bg-amber-50 hover:text-[#B87A16]"
                                                    >
                                                        <Pencil size={15} />
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="px-6 py-14 text-center">
                                <ClipboardCheck
                                    size={32}
                                    className="mx-auto text-gray-300"
                                />

                                <h3 className="mt-4 font-semibold text-gray-800">
                                    No attendance records found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {attendance.length > 0
                                        ? "Try changing your search or filters."
                                        : "Attendance records will appear here once they have been marked."}
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Mark Attendance Modal */}
            {showMarkModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6">
                    <div className="my-auto w-full max-w-lg rounded-xl bg-white shadow-xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Mark Attendance
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Select a course and student to record attendance.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeMarkModal}
                                disabled={creatingAttendance}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mark Attendance Form */}
                        <form
                            onSubmit={handleCreateAttendance}
                            className="space-y-5 p-6"
                        >
                            {/* Course */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Course <span className="text-red-500">*</span>
                                </label>

                                <select
                                    value={markCourseId}
                                    onChange={handleMarkCourseChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                >
                                    <option value="">Select a course</option>

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

                            {/* Student */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Student <span className="text-red-500">*</span>
                                </label>

                                <select
                                    value={selectedEnrollmentId}
                                    onChange={(e) =>
                                        setSelectedEnrollmentId(e.target.value)
                                    }
                                    disabled={
                                        !markCourseId ||
                                        loadingEnrollments ||
                                        courseEnrollments.length === 0
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#B87A16] disabled:cursor-not-allowed disabled:bg-gray-50"
                                >
                                    <option value="">
                                        {loadingEnrollments
                                            ? "Loading students..."
                                            : !markCourseId
                                                ? "Select a course first"
                                                : courseEnrollments.length === 0
                                                    ? "No eligible students found"
                                                    : "Select a student"}
                                    </option>

                                    {courseEnrollments.map((enrollment) => (
                                        <option
                                            key={enrollment._id}
                                            value={enrollment._id}
                                        >
                                            {getStudentName(enrollment.student)} ({enrollment.student.email})
                                        </option>
                                    ))}
                                </select>

                                {loadingEnrollments && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Loading enrolled students...
                                    </p>
                                )}

                                {!loadingEnrollments &&
                                    markCourseId &&
                                    courseEnrollments.length === 0 && (
                                        <p className="mt-2 text-xs text-amber-600">
                                            There are no eligible enrolled students available for this course.
                                        </p>
                                    )}
                            </div>

                            {/* Attendance Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Attendance Date <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="date"
                                    value={attendanceDate}
                                    onChange={(e) =>
                                        setAttendanceDate(e.target.value)
                                    }
                                    required
                                    max={getLocalDateString()}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                />
                            </div>

                            {/* Attendance Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Attendance Status <span className="text-red-500">*</span>
                                </label>

                                <select
                                    value={newAttendanceStatus}
                                    onChange={(e) =>
                                        setNewAttendanceStatus(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                >
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                </select>
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Remarks
                                </label>

                                <textarea
                                    value={newAttendanceRemarks}
                                    onChange={(e) =>
                                        setNewAttendanceRemarks(e.target.value)
                                    }
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Enter remarks (optional)"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                />

                                <p className="mt-1 text-right text-xs text-gray-400">
                                    {newAttendanceRemarks.length}/500 characters
                                </p>
                            </div>

                            {/* Form Buttons */}
                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeMarkModal}
                                    disabled={creatingAttendance}
                                    className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        creatingAttendance ||
                                        loadingEnrollments ||
                                        !selectedEnrollmentId
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#132A46] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={16} />
                                    {creatingAttendance
                                        ? "Saving..."
                                        : "Save Attendance"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Attendance Modal */}
            {editingAttendance && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Edit Attendance
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update the student's attendance record.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeEditModal}
                                disabled={saving}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={handleUpdateAttendance}
                            className="space-y-5 p-6"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Student
                                </label>

                                <input
                                    type="text"
                                    value={getStudentName(editingAttendance.student)}
                                    disabled
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Course
                                </label>

                                <input
                                    type="text"
                                    value={getCourseTitle(editingAttendance.course)}
                                    disabled
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Attendance Status
                                </label>

                                <select
                                    value={editStatus}
                                    onChange={(e) =>
                                        setEditStatus(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                >
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Remarks
                                </label>

                                <textarea
                                    value={editRemarks}
                                    onChange={(e) =>
                                        setEditRemarks(e.target.value)
                                    }
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Enter remarks (optional)"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B87A16]"
                                />

                                <p className="mt-1 text-right text-xs text-gray-400">
                                    {editRemarks.length}/500 characters
                                </p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    disabled={saving}
                                    className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#132A46] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={16} />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default InstructorAttendance;
