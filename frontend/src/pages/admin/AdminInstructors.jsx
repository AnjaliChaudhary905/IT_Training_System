import { useEffect, useState } from "react";
import { Edit, Eye, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import instructorServices from "../../services/instructorService";

const AdminInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        const loadInstructors = async () => {
            try {
                const response =
                    await instructorServices.getAllInstructors();

                if (ignore) {
                    return;
                }

                if (response.success) {
                    setInstructors(response.data);
                }
            } catch (error) {
                if (ignore) {
                    return;
                }

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load instructors"
                );
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadInstructors();

        return () => {
            ignore = true;
        };
    }, []);

    const handleStatusChange = async (instructor) => {
        const newStatus = !instructor.isActive;

        const confirmed = window.confirm(
            `Are you sure you want to ${
                newStatus ? "activate" : "deactivate"
            } this instructor?`
        );

        if (!confirmed) {
            return;
        }

        try {
            const response =
                await instructorServices.updateInstructorStatus(
                    instructor._id,
                    newStatus
                );

            if (response.success) {
                setInstructors((previousInstructors) =>
                    previousInstructors.map((item) =>
                        item._id === instructor._id
                            ? {
                                  ...item,
                                  isActive: newStatus,
                              }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update instructor status"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading instructors...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Instructors
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage instructors registered in the training institute.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* Instructors Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Instructor
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Phone
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {instructors.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center text-sm text-gray-400"
                                    >
                                        No instructors found.
                                    </td>

                                </tr>

                            ) : (

                                instructors.map((instructor) => (

                                    <tr
                                        key={instructor._id}
                                        className="transition hover:bg-gray-50"
                                    >

                                        {/* Instructor */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                {instructor.avatar ? (
                                                    <img
                                                        src={instructor.avatar}
                                                        alt={`${instructor.firstName} ${instructor.lastName}`}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071B41] text-sm font-semibold text-white">
                                                        {instructor.firstName?.[0]}
                                                        {instructor.lastName?.[0]}
                                                    </div>
                                                )}

                                                <div>

                                                    <p className="font-medium text-gray-900">
                                                        {instructor.firstName}{" "}
                                                        {instructor.lastName}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Instructor
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {instructor.email}
                                        </td>

                                        {/* Phone */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {instructor.phone || "—"}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">

                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                    instructor.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {instructor.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                {/* View */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/instructors/${instructor._id}`
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#071B41]"
                                                    title="View instructor"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/instructors/edit/${instructor._id}`
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#071B41]"
                                                    title="Edit instructor"
                                                >
                                                    <Edit size={18} />
                                                </button>

                                                {/* Status */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            instructor
                                                        )
                                                    }
                                                    className={`rounded-lg p-2 text-gray-500 transition ${
                                                        instructor.isActive
                                                            ? "hover:bg-red-50 hover:text-red-600"
                                                            : "hover:bg-green-50 hover:text-green-600"
                                                    }`}
                                                    title={
                                                        instructor.isActive
                                                            ? "Deactivate instructor"
                                                            : "Activate instructor"
                                                    }
                                                >
                                                    {instructor.isActive ? (
                                                        <UserX size={18} />
                                                    ) : (
                                                        <UserCheck size={18} />
                                                    )}
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default AdminInstructors;