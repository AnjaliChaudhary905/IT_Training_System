import User from "../users/user.model.js";


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
        "avatar",
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            instructor[field] = updateData[field];
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
    updateData
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
        "avatar",
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            instructor[field] = updateData[field];
        }
    });

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