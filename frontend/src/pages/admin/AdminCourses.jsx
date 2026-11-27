import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";

import courseServices from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        let ignore = false;

        const loadCourses = async () => {
            try {
                const response =
                    await courseServices.getAllCourses();

                if (ignore) {
                    return;
                }

                if (response.success) {
                    setCourses(response.data);
                }
            } catch (error) {
                if (ignore) {
                    return;
                }

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load courses"
                );
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadCourses();

        return () => {
            ignore = true;
        };
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response =
                await courseServices.deleteCourse(id);

            if (response.success) {
                setCourses((previousCourses) =>
                    previousCourses.filter(
                        (course) => course._id !== id
                    )
                );
            }
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete course"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading courses...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Courses
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage training courses offered by the institute.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={()=>navigate("/admin/courses/new")}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0b2657]"
                >
                    <Plus size={18} />
                    Add Course
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* Courses Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Course
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Level
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Duration
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Fee
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {courses.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-sm text-gray-400"
                                    >
                                        No courses found.
                                    </td>

                                </tr>

                            ) : (

                                courses.map((course) => {

                                    return (
                                        <tr
                                            key={course._id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            {/* Course */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    {course.image?.url ? (
                                                        <img
                                                            src={course.image.url}
                                                            alt={course.title}
                                                            className="h-12 w-16 rounded-lg object-cover"
                                                            onError={() => {
                                                                console.error(
                                                                    "IMAGE FAILED TO LOAD:",
                                                                    course.image.url
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                            No Image
                                                        </div>
                                                    )}

                                                    <div>

                                                        <p className="font-medium text-gray-900">
                                                            {course.title}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {course.isActive
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {course.category}
                                            </td>

                                            {/* Level */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {course.level}
                                            </td>

                                            {/* Duration */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {course.duration}
                                            </td>

                                            {/* Fee */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                Rs. {course.fee}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                       onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#071B41]"
                                                        title="Edit course"
                                                    >
                                                        <Edit size={18} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                course._id
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                        title="Delete course"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default AdminCourses;
