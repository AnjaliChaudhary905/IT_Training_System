import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Edit,

} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import instructorServices from "../../services/instructorService";

const AdminInstructorDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        const loadInstructor = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await instructorServices.getInstructorById(id);

                if (ignore) {
                    return;
                }

                if (response.success) {
                    setInstructor(response.data);
                } else {
                    setError("Failed to load instructor");
                }
            } catch (error) {
                if (ignore) {
                    return;
                }

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load instructor"
                );
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadInstructor();

        return () => {
            ignore = true;
        };
    }, [id]);

    // =========================
    // Loading
    // =========================

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading instructor...
                </p>
            </div>
        );
    }

    // =========================
    // Error
    // =========================

    if (error) {
        return (
            <div className="space-y-4">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/instructors")
                    }
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#071B41]"
                >
                    <ArrowLeft size={18} />
                    Back to Instructors
                </button>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>

            </div>
        );
    }

    if (!instructor) {
        return null;
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6">

            {/* =========================
                Header
            ========================= */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/instructors")
                        }
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Instructor Details
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View instructor profile and professional information.
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/admin/instructors/edit/${instructor._id}`
                        )
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2657]"
                >
                    <Edit size={17} />
                    Edit Instructor
                </button>

            </div>

            {/* =========================
                Profile Header
            ========================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                    {/* Avatar */}

                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">

                        {instructor.avatar ? (
                            <img
                                src={instructor.avatar}
                                alt={`${instructor.firstName} ${instructor.lastName}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#071B41] text-2xl font-bold text-white">
                                {instructor.firstName?.[0]}
                                {instructor.lastName?.[0]}
                            </div>
                        )}

                    </div>

                    {/* Name */}

                    <div className="flex-1">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                            <h2 className="text-2xl font-bold text-gray-900">
                                {instructor.firstName}{" "}
                                {instructor.lastName}
                            </h2>

                            <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                                    instructor.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {instructor.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            {instructor.email}
                        </p>

                        {instructor.specialization && (
                            <p className="mt-1 text-sm font-medium text-[#071B41]">
                                {instructor.specialization}
                            </p>
                        )}

                    </div>

                </div>

            </div>

            {/* =========================
                Personal Information
            ========================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                    Personal Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            First Name
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.firstName || "â€”"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Last Name
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.lastName || "â€”"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Email
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.email || "â€”"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Phone
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.phone || "â€”"}
                        </p>
                    </div>

                </div>

            </div>

            {/* =========================
                Professional Information
            ========================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                    Professional Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Specialization
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.specialization || "â€”"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Experience
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.experience !== undefined &&
                            instructor.experience !== null
                                ? `${instructor.experience} ${
                                      instructor.experience === 1
                                          ? "Year"
                                          : "Years"
                                  }`
                                : "â€”"}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Qualification
                        </p>

                        <p className="mt-1 text-sm text-gray-800">
                            {instructor.qualification || "â€”"}
                        </p>
                    </div>

                </div>

            </div>

            {/* =========================
                Expertise
            ========================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Areas of Expertise
                </h2>

                {instructor.expertise?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">

                        {instructor.expertise.map(
                            (item, index) => (
                                <span
                                    key={`${item}-${index}`}
                                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    {item}
                                </span>
                            )
                        )}

                    </div>
                ) : (
                    <p className="text-sm text-gray-400">
                        No expertise information added.
                    </p>
                )}

            </div>

            {/* =========================
                Biography
            ========================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Biography
                </h2>

                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                    {instructor.bio || "No biography provided."}
                </p>

            </div>

        </div>
    );
};

export default AdminInstructorDetails;
