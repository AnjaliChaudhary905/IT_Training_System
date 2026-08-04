import User from "./user.model.js";

const createUser = async (userData) => {

    const existingUser = await User.findOne({
        email: userData.email,
    });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create(userData);

    return user;
};

const getAllUsers = async () => {
    return await User.find().select("-password");
};

const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

const updateUser = async (id, userData) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(user, userData);

    await user.save();

    return user;
};

const deleteUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    await user.deleteOne();

    return true;
};

const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};

export default userService;