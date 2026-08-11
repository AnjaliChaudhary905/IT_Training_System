import User from "../users/user.model.js";


const getMyProfile = async (userId) => {
    const student = await User.findOne({
        _id: userId,
        role: "student",
    }).select("-resetPasswordToken -resetPasswordExpire");

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }

    return student;
};


const updateMyProfile = async (userId, updateData) => {
    const student = await User.findOne({
        _id: userId,
        role: "student",
    });

    if (!student) {
        const error = new Error("Student not found");
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
            student[field] = updateData[field];
        }
    });

    await student.save();

    return await User.findById(student._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const getAllStudents = async () => {
    return await User.find({
        role: "student",
    })
        .select("-resetPasswordToken -resetPasswordExpire")
        .sort({ createdAt: -1 });
};


const getStudentById = async (studentId) => {
    const student = await User.findOne({
        _id: studentId,
        role: "student",
    }).select("-resetPasswordToken -resetPasswordExpire");

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }

    return student;
};


const updateStudent = async (
    studentId,
    updateData
) => {
    const student = await User.findOne({
        _id: studentId,
        role: "student",
    });

    if (!student) {
        const error = new Error("Student not found");
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
            student[field] = updateData[field];
        }
    });

    await student.save();

    return await User.findById(student._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const updateStudentStatus = async (
    studentId,
    isActive
) => {
    const student = await User.findOne({
        _id: studentId,
        role: "student",
    });

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }

    student.isActive = isActive;

    await student.save();

    return await User.findById(student._id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );
};


const studentService = {
    getMyProfile,
    updateMyProfile,
    getAllStudents,
    getStudentById,
    updateStudent,
    updateStudentStatus,
};


export default studentService;