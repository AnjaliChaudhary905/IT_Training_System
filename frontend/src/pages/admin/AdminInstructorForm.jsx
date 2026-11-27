import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Image as ImageIcon,
    Plus,
    Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import instructorServices from "../../services/instructorService";

const AdminInstructorForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        bio: "",
        expertise: [""],
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // Load Instructor
    // =========================

    useEffect(() => {
        let ignore = false;

        const loadInstructor = async () => {
            try {
                setFetching(true);
                setError("");

                const response =
                    await instructorServices.getInstructorById(id);

                if (ignore) {
                    return;
                }

                if (response.success) {
                    const instructor = response.data;

                    setFormData({
                        firstName: instructor.firstName || "",
                        lastName: instructor.lastName || "",
                        email: instructor.email || "",
                        phone: instructor.phone || "",
                        specialization:
                            instructor.specialization || "",
                        experience:
                            instructor.experience ?? "",
                        qualification:
                            instructor.qualification || "",
                        bio: instructor.bio || "",
                        expertise:
                            instructor.expertise?.length > 0
                                ? instructor.expertise
                                : [""],
                    });

                    if (instructor.avatar) {
                        setImagePreview(instructor.avatar);
                    }
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
                    setFetching(false);
                }
            }
        };

        loadInstructor();

        return () => {
            ignore = true;
        };
    }, [id]);

    // =========================
    // Input Change
    // =========================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // =========================
    // Expertise Change
    // =========================

    const handleExpertiseChange = (index, value) => {
        setFormData((previous) => {
            const updatedExpertise = [...previous.expertise];

            updatedExpertise[index] = value;

            return {
                ...previous,
                expertise: updatedExpertise,
            };
        });
    };

    // =========================
    // Add Expertise
    // =========================

    const addExpertise = () => {
        setFormData((previous) => ({
            ...previous,
            expertise: [...previous.expertise, ""],
        }));
    };

    // =========================
    // Remove Expertise
    // =========================

    const removeExpertise = (index) => {
        setFormData((previous) => {
            const updatedExpertise = previous.expertise.filter(
                (_, itemIndex) => itemIndex !== index
            );

            return {
                ...previous,
                expertise:
                    updatedExpertise.length > 0
                        ? updatedExpertise
                        : [""],
            };
        });
    };

    // =========================
    // Image Change
    // =========================

    const handleImageChange = (event) => {
        const selectedImage = event.target.files?.[0];

        if (!selectedImage) {
            setImage(null);
            return;
        }

        setImage(selectedImage);

        const previewUrl = URL.createObjectURL(selectedImage);

        setImagePreview(previewUrl);
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = new FormData();

            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("phone", formData.phone);

            data.append(
                "specialization",
                formData.specialization
            );

            data.append(
                "experience",
                formData.experience
            );

            data.append(
                "qualification",
                formData.qualification
            );

            data.append(
                "bio",
                formData.bio
            );

            // Remove empty expertise values
            const cleanedExpertise = formData.expertise
                .map((item) => item.trim())
                .filter(Boolean);

            data.append(
                "expertise",
                JSON.stringify(cleanedExpertise)
            );

            // Only send image when admin selected a new one
            if (image) {
                data.append("avatar", image);
            }

            const response =
                await instructorServices.updateInstructor(
                    id,
                    data
                );

            if (response.success) {
                navigate("/admin/instructors");
            }
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update instructor"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Loading State
    // =========================

    if (fetching) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading instructor...
                </p>
            </div>
        );
    }

    // =========================
    // Form
    // =========================

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* Header */}

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
                        Edit Instructor
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update instructor information, expertise and profile image.
                    </p>
                </div>

            </div>

            {/* Error */}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* =========================
                    Personal Information
                ========================= */}

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-lg font-semibold text-gray-900">
                        Personal Information
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">

                        {/* First Name */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
                        </div>

                        {/* Last Name */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
                        </div>

                        {/* Email */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Email cannot be changed by the administrator.
                            </p>
                        </div>

                        {/* Phone */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
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

                        {/* Specialization */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Specialization
                            </label>

                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="e.g. Full Stack Development"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
                        </div>

                        {/* Experience */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                name="experience"
                                min="0"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
                        </div>

                        {/* Qualification */}

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Qualification
                            </label>

                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder="e.g. MSc. Computer Science"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />
                        </div>

                        {/* Bio */}

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Biography
                            </label>

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Write a short professional biography..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Briefly describe the instructor's professional background and teaching experience.
                            </p>
                        </div>

                    </div>

                </div>

                {/* =========================
                    Expertise
                ========================= */}

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center justify-between gap-4">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Areas of Expertise
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add the technologies, subjects or skills this instructor specializes in.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addExpertise}
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#071B41] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#0b2657]"
                        >
                            <Plus size={16} />
                            Add
                        </button>

                    </div>

                    <div className="space-y-3">

                        {formData.expertise.map(
                            (expertise, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >

                                    <input
                                        type="text"
                                        value={expertise}
                                        onChange={(event) =>
                                            handleExpertiseChange(
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder={`Expertise ${index + 1}`}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExpertise(index)
                                        }
                                        disabled={
                                            formData.expertise.length === 1
                                        }
                                        className="rounded-lg border border-gray-200 p-2.5 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            )
                        )}

                    </div>

                </div>

                {/* =========================
                    Profile Image
                ========================= */}

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                        Profile Image
                    </h2>

                    <p className="mb-5 text-sm text-gray-500">
                        Adding an image is optional. If the instructor already
                        has a profile image, it will be displayed here.
                    </p>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                        {/* Preview */}

                        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-gray-300 bg-gray-50">

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt={`${formData.firstName} ${formData.lastName}`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <ImageIcon size={28} />

                                    <span className="text-xs">
                                        No Image
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Upload */}

                        <div className="flex-1">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Optional. Select a new image only if you want
                                to add or replace the instructor's current image.
                            </p>

                            {image && (
                                <p className="mt-2 text-xs font-medium text-gray-600">
                                    Selected: {image.name}
                                </p>
                            )}

                        </div>

                    </div>

                </div>

                {/* =========================
                    Buttons
                ========================= */}

                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/instructors")
                        }
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2657] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Instructor"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default AdminInstructorForm;