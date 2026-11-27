import User from "../users/user.model.js";
import uploadToCloudinary from "../../utils/cloudinary.js";


const getMyProfile = async (userId) => {
    const instructor = await User.findOne({
        _id: userId,
        role: "instructor",
    }).select("-resetPasswordToken -resetPasswordExpire");

    if (!instructor) {
        const error = new Error("Instructor not found");
        error.statusCode = 404;
        throw error;
    }

    return instructor;
};


const updateMyProfile = async (userId, updateData) => {
    const instructor = await User.findOne({
        _id: userId,
        role: "instructor",
    });

    if (!instructor) {
        const error = new Error("Instructor not found");
        error.statusCode = 404;
        throw error;
    }

    const allowedFields = [
        "firstName",
        "lastName",
        "phone",
        "specialization",
        "experience",
        "qualification",
        "bio",
        "expertise",
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            if (field === "expertise") {
                instructor[field] =
                    typeof updateData[field] === "string"
                        ? JSON.parse(updateData[field])
                        : updateData[field];
            } else {
                instructor[field] = updateData[field];
            }
        }
    });

    await instructor.save();

    return await User.findById(instructor._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const getAllInstructors = async () => {
    return await User.find({
        role: "instructor",
        isActive: true,
    })
        .select("-resetPasswordToken -resetPasswordExpire")
        .sort({ createdAt: -1 });
};


const getInstructorById = async (instructorId) => {
    const instructor = await User.findOne({
        _id: instructorId,
        role: "instructor",
    }).select("-resetPasswordToken -resetPasswordExpire");

    if (!instructor) {
        const error = new Error("Instructor not found");
        error.statusCode = 404;
        throw error;
    }

    return instructor;
};


const updateInstructor = async (
    instructorId,
    updateData,
    imageFile
) => {
    const instructor = await User.findOne({
        _id: instructorId,
        role: "instructor",
    });

    if (!instructor) {
        const error = new Error("Instructor not found");
        error.statusCode = 404;
        throw error;
    }

    const allowedFields = [
        "firstName",
        "lastName",
        "phone",
        "specialization",
        "experience",
        "qualification",
        "bio",
        "expertise",
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            if (field === "expertise") {
                instructor[field] =
                    typeof updateData[field] === "string"
                        ? JSON.parse(updateData[field])
                        : updateData[field];
            } else {
                instructor[field] = updateData[field];
            }
        }
    });

    // Optional instructor image
    if (imageFile) {
        const uploadedImage = await uploadToCloudinary(
            imageFile.buffer,
            "IT_Training_System/instructors"
        );

        instructor.avatar = uploadedImage.secure_url;
    }

    await instructor.save();

    return await User.findById(instructor._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const updateInstructorStatus = async (
    instructorId,
    isActive
) => {
    const instructor = await User.findOne({
        _id: instructorId,
        role: "instructor",
    });

    if (!instructor) {
        const error = new Error("Instructor not found");
        error.statusCode = 404;
        throw error;
    }

    instructor.isActive = isActive;

    await instructor.save();

    return await User.findById(instructor._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const instructorService = {
    getMyProfile,
    updateMyProfile,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    updateInstructorStatus,
};


export default instructorService;