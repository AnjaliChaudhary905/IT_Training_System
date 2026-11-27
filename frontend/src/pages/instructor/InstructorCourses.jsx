
import { useCallback, useEffect, useState } from "react";
import {
    BookOpen,
    RefreshCw,
    Clock,
    IndianRupee,
    Layers,
    AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import courseServices from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const loadCourses = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await courseServices.getMyCourses();

            setCourses(response.data || []);
        } catch (err) {
            console.error("Error fetching instructor courses:", err);

            const message =
                err.response?.data?.message ||
                "Unable to load your courses.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            await loadCourses();
        };

        fetchCourses();
    }, [loadCourses]);

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[#B87A16]">
                        INSTRUCTOR PORTAL
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        My Courses
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View and manage the courses assigned to you.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => loadCourses(true)}
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

            {/* Course Count */}
            {!loading && !error && (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B41]/5 text-[#071B41]">
                        <BookOpen size={23} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Assigned Courses
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            {courses.length}
                        </h2>
                    </div>
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
                        Loading your courses...
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
                        Failed to load courses
                    </h3>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => loadCourses()}
                        className="mt-5 rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#132A46]"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && courses.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <BookOpen size={30} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-gray-900">
                        No courses assigned yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                        You don't have any courses assigned to you at the moment.
                        Please contact the administrator for course assignments.
                    </p>
                </div>
            )}

            {/* Course Cards */}
            {!loading && !error && courses.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Course Image */}
                            <div className="relative h-48 bg-gray-100">
                                {course.image?.url ? (
                                    <img
                                        src={course.image.url}
                                        alt={course.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400">
                                        <BookOpen size={45} />
                                    </div>
                                )}

                                <span
                                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${course.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {course.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Course Information */}
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="rounded-md bg-[#071B41]/5 px-3 py-1 text-xs font-medium text-[#071B41]">
                                        {course.category}
                                    </span>

                                    <span className="text-xs font-medium text-gray-500">
                                        {course.level}
                                    </span>
                                </div>

                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    {course.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                    {course.description}
                                </p>

                                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock
                                            size={17}
                                            className="text-[#B87A16]"
                                        />
                                        <span>{course.duration}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                        <IndianRupee
                                            size={17}
                                            className="text-[#B87A16]"
                                        />
                                        <span>
                                            {Number(course.fee || 0).toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Layers
                                            size={17}
                                            className="text-[#B87A16]"
                                        />
                                        <span>
                                            {course.syllabus?.length || 0} syllabus topics
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/instructor/courses/${course._id}`)
                                        }
                                        className="mt-5 w-full rounded-lg bg-[#071B41] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#132A46]"
                                    >
                                        View Course Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default InstructorCourses;
