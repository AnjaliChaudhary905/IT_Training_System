
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    BookOpen,
    ClipboardCheck,
    UserRound,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const InstructorLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/instructor",
            icon: LayoutDashboard,
        },
        {
            name: "My Courses",
            path: "/instructor/courses",
            icon: BookOpen,
        },
        {
            name: "Attendance",
            path: "/instructor/attendance",
            icon: ClipboardCheck,
        },
        {
            name: "My Profile",
            path: "/instructor/profile",
            icon: UserRound,
        },
    ];

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="h-screen overflow-hidden bg-gray-100">

            {/* Mobile Header */}
            <div className="flex h-[73px] shrink-0 items-center justify-between bg-[#071B41] px-5 py-4 lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5A623] font-bold text-[#071B41]">
                        S
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            Sipalaya
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-white/50">
                            Instructor Portal
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="rounded-md p-2 text-white"
                    aria-label={
                        isSidebarOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                >
                    {isSidebarOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            </div>

            {/* Main Instructor Area */}
            <div className="flex h-[calc(100vh-73px)] lg:h-screen">

                {/* Sidebar */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50
                        flex w-64 flex-col
                        bg-[#071B41]
                        text-white
                        transition-all duration-300
                        lg:relative lg:z-auto
                        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
                        ${
                            isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                        lg:translate-x-0
                    `}
                >

                    {/* Logo */}
                    <div className="hidden h-[73px] shrink-0 items-center border-b border-white/10 px-5 lg:flex">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F5A623] font-bold text-[#071B41]">
                                S
                            </div>

                            {!isCollapsed && (
                                <div>
                                    <p className="text-sm font-semibold">
                                        Sipalaya
                                    </p>

                                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                                        Instructor Portal
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">

                        {!isCollapsed && (
                            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                                Main Menu
                            </p>
                        )}

                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/instructor"}
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    title={
                                        isCollapsed
                                            ? item.name
                                            : ""
                                    }
                                    className={({ isActive }) => `
                                        flex items-center gap-3 rounded-lg px-3 py-3
                                        text-sm font-medium
                                        transition
                                        ${
                                            isActive
                                                ? "bg-[#F5A623] text-[#071B41]"
                                                : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={19}
                                        className="shrink-0"
                                    />

                                    {!isCollapsed && (
                                        <span>{item.name}</span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Bottom Section */}
                    <div className="shrink-0 border-t border-white/10 p-3">

                        {/* Settings */}
                        <button
                            type="button"
                            onClick={() => {
                                setIsSidebarOpen(false);
                                navigate("/instructor/profile");
                            }}
                            title={
                                isCollapsed
                                    ? "Settings"
                                    : ""
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <Settings
                                size={19}
                                className="shrink-0"
                            />

                            {!isCollapsed && (
                                <span>Settings</span>
                            )}
                        </button>

                        {/* User Information */}
                        {!isCollapsed && (
                            <div className="mt-3 rounded-lg bg-white/5 p-3">
                                <p className="truncate text-sm font-medium text-white">
                                    {user?.firstName}{" "}
                                    {user?.lastName}
                                </p>

                                <p className="truncate text-xs text-white/40">
                                    {user?.email}
                                </p>
                            </div>
                        )}

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            title={
                                isCollapsed
                                    ? "Logout"
                                    : ""
                            }
                            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                        >
                            <LogOut
                                size={19}
                                className="shrink-0"
                            />

                            {!isCollapsed && (
                                <span>Logout</span>
                            )}
                        </button>

                        {/* Collapse Button */}
                        <button
                            type="button"
                            onClick={() =>
                                setIsCollapsed(!isCollapsed)
                            }
                            className="mt-2 hidden w-full items-center justify-center rounded-lg py-2 text-white/40 transition hover:bg-white/10 hover:text-white lg:flex"
                            title={
                                isCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            <ChevronLeft
                                size={18}
                                className={`transition-transform ${
                                    isCollapsed
                                        ? "rotate-180"
                                        : ""
                                }`}
                            />
                        </button>
                    </div>
                </aside>

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() =>
                            setIsSidebarOpen(false)
                        }
                    />
                )}

                {/* Main Content Area */}
                <main className="min-w-0 flex-1 overflow-hidden">

                    {/* Desktop Top Bar */}
                    <div className="hidden h-[73px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex">
                        <div>
                            <p className="text-sm text-gray-500">
                                Welcome back,
                            </p>

                            <h1 className="text-lg font-semibold text-gray-900">
                                {user?.firstName}{" "}
                                {user?.lastName}
                            </h1>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071B41] text-sm font-semibold text-white">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                        </div>
                    </div>

                    {/* Scrollable Page Content */}
                    <div className="h-full overflow-y-auto lg:h-[calc(100vh-73px)]">
                        <div className="p-5 sm:p-6 lg:p-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InstructorLayout;
