import crypto from "crypto";
import User from "../users/user.model.js";
import { generateToken } from "../../utils/jwt.js";
import sendEmail from "../../utils/sendEmail.js";

const loginUser = async (loginData) => {
    const { email, password } = loginData;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    if (!user.isActive) {
        const error = new Error("Account has been deactivated");
        error.statusCode = 403;
        throw error;
    }

    user.lastLogin = new Date();

    await user.save({ validateBeforeSave: false });
    const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    return {
        token,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            isVerified: user.isVerified,
        },
    };
};

const logoutUser = async () => {
    return true;
};

const getMe = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
        <h2>Password Reset</h2>

        <p>You requested a password reset.</p>

        <p>
            <a href="${resetUrl}">
                Reset Password
            </a>
        </p>

        <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
        email: user.email,
        subject: "Password Reset",
        message,
    });

    return true;
};

const resetPassword = async (token, password) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        const error = new Error("Reset token is invalid or expired");
        error.statusCode = 400;
        throw error;
    }

    user.password = password;

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return true;
};

const authService = {
    loginUser,
    logoutUser,
    getMe,
    forgotPassword,
    resetPassword,
};

export default authService;