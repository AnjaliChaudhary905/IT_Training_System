import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import courseServices from "../../services/courseService";
import instructorServices from "../../services/instructorService";

const AdminCourseForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        level: "",
        duration: "",
        fee: "",
        enrollmentDeadline: "",
        syllabus: [""],
        prerequisites: [""],
        instructor: "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState("");

    const [instructors, setInstructors] = useState([]);
    const [loadingInstructors, setLoadingInstructors] = useState(false);
    const [instructorError, setInstructorError] = useState("");

    // =========================
    // Load active instructors
    // =========================

    useEffect(() => {
        const loadInstructors = async () => {
            try {
                setLoadingInstructors(true);
                setInstructorError("");

                const response =
                    await instructorServices.getAllInstructors();

                if (response.success) {
                    setInstructors(response.data || []);
                } else {
                    setInstructorError(
                        response.message || "Failed to load instructors"
                    );
                }
            } catch (error) {
                console.error(error);

                setInstructorError(
                    error.response?.data?.message ||
                    "Failed to load instructors"
                );
            } finally {
                setLoadingInstructors(false);
            }
        };

        loadInstructors();
    }, []);

    // =========================
    // Handle normal inputs
    // =========================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // =========================
    // Handle image selection
    // =========================

    const handleImageChange = (event) => {
        const selectedImage = event.target.files?.[0];

        if (!selectedImage) {
            setImage(null);
            return;
        }

        // Revoke previous local preview if it was a blob URL
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImage(selectedImage);

        const previewUrl = URL.createObjectURL(selectedImage);

        setImagePreview(previewUrl);
    };

    // =========================
    // Load course in edit mode
    // =========================

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadCourse = async () => {
            try {
                setFetching(true);
                setError("");

                const response =
                    await courseServices.getCourseById(id);

                if (!response.success) {
                    setError(
                        response.message ||
                        "Failed to load course"
                    );
                    return;
                }

                const course = response.data;

                setFormData({
                    title: course.title || "",
                    description: course.description || "",
                    category: course.category || "",
                    level: course.level || "",
                    duration: course.duration || "",
                    fee: course.fee ?? "",
                    enrollmentDeadline:
                        course.enrollmentDeadline
                            ? course.enrollmentDeadline.split("T")[0]
                            : "",
                    syllabus:
                        course.syllabus?.length > 0
                            ? course.syllabus
                            : [""],
                    prerequisites:
                        course.prerequisites?.length > 0
                            ? course.prerequisites
                            : [""],
                    instructor: course.instructor?._id || "",
                });

                // Existing Cloudinary image
                if (course.image?.url) {
                    setImagePreview(course.image.url);
                }
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load course"
                );
            } finally {
                setFetching(false);
            }
        };

        loadCourse();
    }, [id, isEditMode]);

    // =========================
    // Cleanup image preview
    // =========================

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // =========================
    // Array fields
    // =========================

    const handleArrayChange = (type, index, value) => {
        setFormData((previous) => ({
            ...previous,
            [type]: previous[type].map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? value
                        : item
            ),
        }));
    };

    const addArrayItem = (type) => {
        setFormData((previous) => ({
            ...previous,
            [type]: [
                ...previous[type],
                "",
            ],
        }));
    };

    const removeArrayItem = (type, index) => {
        setFormData((previous) => {
            const updatedItems =
                previous[type].filter(
                    (_, itemIndex) =>
                        itemIndex !== index
                );

            return {
                ...previous,
                [type]:
                    updatedItems.length > 0
                        ? updatedItems
                        : [""],
            };
        });
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const cleanedSyllabus =
                formData.syllabus
                    .map((item) => item.trim())
                    .filter(Boolean);

            const cleanedPrerequisites =
                formData.prerequisites
                    .map((item) => item.trim())
                    .filter(Boolean);

            const data = new FormData();

            data.append(
                "title",
                formData.title
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "level",
                formData.level
            );

            data.append(
                "duration",
                formData.duration
            );

            data.append(
                "fee",
                formData.fee
            );

            data.append(
                "enrollmentDeadline",
                formData.enrollmentDeadline
            );

            data.append(
                "syllabus",
                JSON.stringify(cleanedSyllabus)
            );

            data.append(
                "prerequisites",
                JSON.stringify(
                    cleanedPrerequisites
                )
            );

            // Instructor assignment
            data.append(
                "instructor",
                formData.instructor
            );

            // Only append image if a NEW image was selected
            if (image) {
                data.append("image", image);
            }

            const response = isEditMode
                ? await courseServices.updateCourse(
                      id,
                      data
                  )
                : await courseServices.createCourse(
                      data
                  );

            if (!response.success) {
                setError(
                    response.message ||
                    (
                        isEditMode
                            ? "Failed to update course"
                            : "Failed to create course"
                    )
                );

                return;
            }

            navigate("/admin/courses");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                (
                    isEditMode
                        ? "Failed to update course"
                        : "Failed to create course"
                )
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Fetching state
    // =========================

    if (fetching) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                        Loading course...
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Please wait while the course details are loaded.
                    </p>
                </div>
            </div>
        );
    }

    // =========================
    // UI
    // =========================

    return (
        <div className="mx-auto max-w-5xl space-y-6">

            {/* Header */}
            <div className="flex items-center gap-4">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/courses")
                    }
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {isEditMode
                            ? "Edit Course"
                            : "Add Course"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        {isEditMode
                            ? "Update the training course details."
                            : "Create a new training course."}
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

                {/* Basic Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-lg font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">

                        {/* Title */}
                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Course Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. MERN Stack Development"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the course..."
                                rows="5"
                                required
                                disabled={loading}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Category */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Web Development"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Level */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Level
                            </label>

                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            >
                                <option value="">
                                    Select level
                                </option>

                                <option value="Beginner">
                                    Beginner
                                </option>

                                <option value="Intermediate">
                                    Intermediate
                                </option>

                                <option value="Advanced">
                                    Advanced
                                </option>
                            </select>

                        </div>

                        {/* Duration */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Duration
                            </label>

                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 3 Months"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Fee */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Fee
                            </label>

                            <input
                                type="number"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                placeholder="e.g. 25000"
                                min="0"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Enrollment Deadline */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Enrollment Deadline
                            </label>

                            <input
                                type="date"
                                name="enrollmentDeadline"
                                value={formData.enrollmentDeadline}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            />

                        </div>

                        {/* Assigned Instructor */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Assigned Instructor
                            </label>

                            <select
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                disabled={loading || loadingInstructors}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                            >
                                <option value="">
                                    No Instructor Assigned
                                </option>

                                {instructors.map((instructor) => (
                                    <option
                                        key={instructor._id}
                                        value={instructor._id}
                                    >
                                        {instructor.firstName} {instructor.lastName}
                                        {" - "}
                                        {instructor.specialization || "Instructor"}
                                    </option>
                                ))}
                            </select>

                            {loadingInstructors && (
                                <p className="mt-2 text-xs text-gray-500">
                                    Loading instructors...
                                </p>
                            )}

                            {instructorError && (
                                <p className="mt-2 text-xs text-red-600">
                                    {instructorError}
                                </p>
                            )}

                            <p className="mt-2 text-xs text-gray-500">
                                Select an instructor to assign this course. You can also leave it unassigned.
                            </p>

                        </div>

                        {/* Course Image */}
                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Course Image
                            </label>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                                {/* Preview */}
                                <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 sm:h-32 sm:w-48">

                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Course preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <ImageIcon size={28} />

                                            <span className="text-xs">
                                                Image Preview
                                            </span>
                                        </div>
                                    )}

                                </div>

                                {/* File Input */}
                                <div className="flex-1">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={loading}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                                    />

                                    <p className="mt-2 text-xs text-gray-500">
                                        {isEditMode
                                            ? "Select a new image only if you want to replace the current image."
                                            : "Select an image for the course."}
                                    </p>

                                    {image && (
                                        <p className="mt-2 text-xs font-medium text-gray-600">
                                            Selected: {image.name}
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Syllabus */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Syllabus
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add the main topics covered in this course.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem("syllabus")
                            }
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <Plus size={16} />
                            Add Topic
                        </button>

                    </div>

                    <div className="space-y-3">

                        {formData.syllabus.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="flex gap-2"
                                >

                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(event) =>
                                            handleArrayChange(
                                                "syllabus",
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder={`Topic ${index + 1}`}
                                        disabled={loading}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem(
                                                "syllabus",
                                                index
                                            )
                                        }
                                        disabled={loading}
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            )
                        )}

                    </div>

                </div>

                {/* Prerequisites */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Prerequisites
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add requirements students should know before enrolling.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem(
                                    "prerequisites"
                                )
                            }
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <Plus size={16} />
                            Add
                        </button>

                    </div>

                    <div className="space-y-3">

                        {formData.prerequisites.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="flex gap-2"
                                >

                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(event) =>
                                            handleArrayChange(
                                                "prerequisites",
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder={`Prerequisite ${index + 1}`}
                                        disabled={loading}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#071B41] focus:ring-1 focus:ring-[#071B41] disabled:bg-gray-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem(
                                                "prerequisites",
                                                index
                                            )
                                        }
                                        disabled={loading}
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            )
                        )}

                    </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/courses")
                        }
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-[#071B41] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2657] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? isEditMode
                                ? "Updating..."
                                : "Creating..."
                            : isEditMode
                                ? "Update Course"
                                : "Create Course"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default AdminCourseForm;