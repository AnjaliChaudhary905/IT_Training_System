import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await login(formData);
            console.log("LOGIN RESPONSE:", JSON.stringify(response, null, 2));
            console.log("USER ROLE:", response?.data?.role);

            if (response?.success) {
                toast.success(response.message || "Login successful");

                const role = response?.data?.user?.role?.toLowerCase();

                if (role === "admin") {
                    navigate("/admin");
                } else if (role === "instructor") {
                    navigate("/instructor");
                } else if (role === "student") {
                    navigate("/student");
                } else {
                    navigate("/");
                }
            } else {
                toast.error(response?.message || "Login failed");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-80px)] bg-gray-50">
            <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">

                {/* Left Section */}
                <div className="hidden bg-[#071A40] px-12 py-16 text-white lg:flex lg:flex-col lg:justify-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                        IT Training
                    </p>

                    <h1 className="mt-4 max-w-lg text-4xl font-bold leading-tight">
                        Build Skills.
                        <br />
                        Build Your Career.
                    </h1>

                    <p className="mt-6 max-w-lg leading-7 text-slate-300">
                        Access your learning platform and continue your
                        journey with practical, industry-focused training.
                    </p>

                    <div className="mt-10 space-y-4">
                        {[
                            "Industry-focused courses",
                            "Practical project-based learning",
                            "Experienced instructors",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 text-sm text-slate-300"
                            >
                                <div className="h-2 w-2 rounded-full bg-[#F9A825]" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login Form */}
                <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

                    <div className="w-full max-w-md">

                        <div className="mb-8 text-center lg:text-left">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825] lg:mx-0">
                                <LockKeyhole size={26} />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-[#071A40]">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Sign in to access your account.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-[#071A40]"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/20"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-[#071A40]"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-medium text-[#C47D10] hover:text-[#071A40]"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#071A40]"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#071A40] px-5 py-3 font-semibold text-white transition hover:bg-[#0b285d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-[#C47D10] hover:text-[#071A40]"
                            >
                                Create an account
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </main>
    );
};

export default Login;