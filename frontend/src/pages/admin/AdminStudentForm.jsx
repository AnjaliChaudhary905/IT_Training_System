import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Loader2,
    Mail,
    Phone,
    Save,
    User,
} from "lucide-react";

import studentServices from "../../services/studentService";

const AdminStudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);

                const response =
                    await studentServices.getStudentById(id);

                const student = response.data;

                setFormData({
                    firstName: student.firstName || "",
                    lastName: student.lastName || "",
                    email: student.email || "",
                    phone: student.phone || "",
                });
            } catch (error) {
                console.error("Failed to fetch student:", error);

                toast.error(
                    error.response?.data?.message ||
                        "Failed to load student"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            toast.error("First name is required");
            return;
        }

        if (!formData.lastName.trim()) {
            toast.error("Last name is required");
            return;
        }

        if (!formData.phone.trim()) {
            toast.error("Phone number is required");
            return;
        }

        try {
            setSaving(true);

            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phone: formData.phone.trim(),
            };

            await studentServices.updateStudent(id, updateData);

            toast.success("Student updated successfully");

            navigate(`/admin/students/${id}`);
        } catch (error) {
            console.error("Failed to update student:", error);

            toast.error(
                error.response?.data?.message ||
                    "Failed to update student"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2
                    size={32}
                    className="animate-spin text-blue-600"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-6 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/admin/students/${id}`)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Student
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Update the student's basic information
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <User size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Student Information
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Edit the student's personal details
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6"
                    >
                        {/* Name */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                            >
                                <Mail size={16} />
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                                Email address cannot be changed from
                                student management.
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                            >
                                <Phone size={16} />
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Avatar Information */}
                        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                            <p className="text-sm font-medium text-blue-900">
                                Profile photo
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-700">
                                Profile photo changes are managed by the
                                student from their Student Portal.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/admin/students/${id}`
                                    )
                                }
                                disabled={saving}
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={17} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminStudentForm;