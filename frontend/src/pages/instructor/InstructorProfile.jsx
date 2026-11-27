
import { useEffect, useState } from "react";
import {
    UserRound,
    BriefcaseBusiness,
    GraduationCap,
    Save,
    Pencil,
    X,
    Plus,
    Camera,
    LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import instructorServices from "../../services/instructorService";

// Prepare profile data for the form
const getProfileFormData = (instructor) => ({
    firstName: instructor.firstName || "",
    lastName: instructor.lastName || "",
    phone: instructor.phone || "",
    specialization: instructor.specialization || "",
    experience: instructor.experience ?? "",
    qualification: instructor.qualification || "",
    bio: instructor.bio || "",
    expertise: instructor.expertise || [],
});

const InstructorProfile = () => {
    const [profile, setProfile] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        bio: "",
        expertise: [],
    });

    const [newExpertise, setNewExpertise] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Fetch instructor profile
    useEffect(() => {
        let ignore = false;

        const loadProfile = async () => {
            try {
                const response =
                    await instructorServices.getMyProfile();

                if (ignore) return;

                const instructor = response.data;

                setProfile(instructor);
                setFormData(getProfileFormData(instructor));
            } catch (error) {
                if (!ignore) {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load instructor profile"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            ignore = true;
        };
    }, [retryCount]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Add expertise
    const addExpertise = () => {
        const value = newExpertise.trim();

        if (!value) {
            toast.error("Please enter an expertise");
            return;
        }

        const alreadyExists = formData.expertise.some(
            (item) =>
                item.toLowerCase() === value.toLowerCase()
        );

        if (alreadyExists) {
            toast.error("This expertise already exists");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            expertise: [...prev.expertise, value],
        }));

        setNewExpertise("");
    };

    // Remove expertise
    const removeExpertise = (index) => {
        setFormData((prev) => ({
            ...prev,
            expertise: prev.expertise.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // Update instructor profile
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const payload = {
                ...formData,
                experience:
                    formData.experience === ""
                        ? 0
                        : Number(formData.experience),
            };

            const response =
                await instructorServices.updateMyProfile(payload);

            const updatedInstructor = response.data;

            setProfile(updatedInstructor);
            setFormData(getProfileFormData(updatedInstructor));
            setIsEditing(false);

            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        if (profile) {
            setFormData(getProfileFormData(profile));
        }

        setNewExpertise("");
        setIsEditing(false);
    };

    // Loading screen
    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <LoaderCircle
                    className="animate-spin text-[#F5A623]"
                    size={35}
                />
            </div>
        );
    }

    // Error screen
    if (!profile) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-gray-600">
                    Unable to load instructor profile.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        setLoading(true);
                        setRetryCount((prev) => prev + 1);
                    }}
                    className="mt-4 rounded-lg bg-[#071B41] px-5 py-2 text-white"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const inputClass =
        "mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 disabled:bg-gray-50 disabled:text-gray-500";

    const labelClass =
        "text-sm font-medium text-gray-700";

    return (
        <div className="space-y-6">

            {/* Page Heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#071B41]">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your personal and professional information.
                    </p>
                </div>

                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#071B41] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102c5b]"
                    >
                        <Pencil size={16} />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            <X size={16} />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            form="instructor-profile-form"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-[#F5A623] px-5 py-3 text-sm font-semibold text-[#071B41] hover:bg-[#e99b17] disabled:opacity-60"
                        >
                            {saving ? (
                                <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : (
                                <Save size={16} />
                            )}

                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>

            {/* Profile Header */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="h-32 bg-gradient-to-r from-[#071B41] to-[#183b70]" />

                <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-[#F5A623] text-3xl font-bold text-[#071B41] shadow-md">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt="Instructor avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`
                                )}
                            </div>

                            <div className="pb-1">
                                <h2 className="text-xl font-bold text-[#071B41]">
                                    {profile.firstName} {profile.lastName}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {profile.specialization || "Instructor"}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
                                profile.isActive
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {profile.isActive
                                ? "Active Instructor"
                                : "Inactive Instructor"}
                        </span>
                    </div>

                    <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
                        <div>
                            <p className="text-xs text-gray-400">
                                Email Address
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-gray-700">
                                {profile.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Phone Number
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {profile.phone || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Experience
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {profile.experience ?? 0} Years
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <form
                id="instructor-profile-form"
                onSubmit={handleSave}
                className="space-y-6"
            >
                {/* Personal Information */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-[#071B41]">
                            <UserRound size={20} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#071B41]">
                                Personal Information
                            </h3>

                            <p className="text-xs text-gray-500">
                                Your basic contact information
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className={labelClass}>
                            First Name

                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                                minLength={2}
                                maxLength={50}
                                className={inputClass}
                            />
                        </label>

                        <label className={labelClass}>
                            Last Name

                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                                minLength={2}
                                maxLength={50}
                                className={inputClass}
                            />
                        </label>

                        <label className={labelClass}>
                            Email Address

                            <input
                                value={profile.email || ""}
                                disabled
                                className={inputClass}
                            />
                        </label>

                        <label className={labelClass}>
                            Phone Number

                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={inputClass}
                            />
                        </label>
                    </div>
                </section>

                {/* Professional Information */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-amber-50 p-3 text-[#b7791f]">
                            <BriefcaseBusiness size={20} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#071B41]">
                                Professional Information
                            </h3>

                            <p className="text-xs text-gray-500">
                                Your teaching background and qualifications
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className={labelClass}>
                            Specialization

                            <input
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                disabled={!isEditing}
                                maxLength={100}
                                className={inputClass}
                            />
                        </label>

                        <label className={labelClass}>
                            Years of Experience

                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                disabled={!isEditing}
                                min="0"
                                className={inputClass}
                            />
                        </label>

                        <label className={`${labelClass} sm:col-span-2`}>
                            Qualification

                            <input
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                disabled={!isEditing}
                                maxLength={150}
                                className={inputClass}
                            />
                        </label>

                        <label className={`${labelClass} sm:col-span-2`}>
                            Professional Bio

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={4}
                                maxLength={1000}
                                className={`${inputClass} resize-y`}
                                placeholder="Write a short professional introduction..."
                            />

                            <span className="mt-1 block text-right text-xs text-gray-400">
                                {formData.bio.length}/1000
                            </span>
                        </label>
                    </div>
                </section>

                {/* Areas of Expertise */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <GraduationCap size={20} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#071B41]">
                                Areas of Expertise
                            </h3>

                            <p className="text-xs text-gray-500">
                                Technologies and skills you specialize in
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {formData.expertise.length > 0 ? (
                            formData.expertise.map((item, index) => (
                                <span
                                    key={`${item}-${index}`}
                                    className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#071B41]"
                                >
                                    {item}

                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeExpertise(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            aria-label={`Remove ${item}`}
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                No expertise added yet.
                            </p>
                        )}
                    </div>

                    {isEditing && (
                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                            <input
                                value={newExpertise}
                                onChange={(e) =>
                                    setNewExpertise(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addExpertise();
                                    }
                                }}
                                placeholder="Enter a skill or technology"
                                className={`${inputClass} mt-0`}
                            />

                            <button
                                type="button"
                                onClick={addExpertise}
                                className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#071B41] px-5 py-3 text-sm font-semibold text-white hover:bg-[#183b70]"
                            >
                                <Plus size={16} />
                                Add Skill
                            </button>
                        </div>
                    )}
                </section>
            </form>

            {/* Avatar Information */}
            <p className="flex items-center gap-2 text-xs text-gray-400">
                <Camera size={14} />
                Profile photo changes are not available yet.
            </p>
        </div>
    );
};

export default InstructorProfile;
