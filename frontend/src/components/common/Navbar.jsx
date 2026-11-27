import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Instructors", href: "/instructors" },
    { name: "Contact", href: "/contact" },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();

    setIsProfileOpen(false);
    setIsMenuOpen(false);

    navigate("/");
  };

  const getDashboardPath = () => {
    if (user?.role === "admin") {
      return "/admin";
    }

    if (user?.role === "instructor") {
      return "/instructor";
    }

    if (user?.role === "student") {
      return "/student";
    }

    return "/";
  };

  const getRoleName = () => {
    if (user?.role === "admin") {
      return "Administrator";
    }

    if (user?.role === "instructor") {
      return "Instructor";
    }

    if (user?.role === "student") {
      return "Student";
    }

    return "User";
  };

  const getInitials = () => {
    if (!user) return "U";

    const first = user.firstName?.charAt(0) || "";
    const last = user.lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase() || "U";
  };

  const handleProfileNavigation = (path) => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-[#061A3A] text-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs sm:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Koteshwor, Kathmandu</span>
            <span>infotech@sipalaya.com</span>
            <span>9851344071 / 9806393939</span>
          </div>

          <div className="hidden gap-4 sm:flex">
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071B41]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5A623] text-xl font-bold text-[#071B41]">
              S
            </div>

            <div>
              <h1 className="font-serif text-base font-semibold leading-tight text-white">
                Sipalaya Info Tech
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-white/50">
                IT Training · Koteshwor
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-white/75 transition hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">

            {!isAuthenticated ? (
              <>
                {/* Login */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
                >
                  Login
                </button>

                {/* Sign Up */}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#071B41] transition hover:bg-[#ffb43d]"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Free Demo */}
                <a
                  href="#contact"
                  className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
                >
                  Free Demo
                </a>

                {/* Enroll Now */}
                <a
                  href="#courses"
                  className="flex items-center gap-2 rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#071B41] transition hover:bg-[#ffb43d]"
                >
                  Enroll Now
                  <ArrowUpRight size={16} />
                </a>
              </>
            )}

            {/* Profile */}
            {isAuthenticated && (
              <div className="relative ml-1" ref={profileRef}>

                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] font-semibold text-[#071B41] transition hover:bg-[#ffb43d]"
                  aria-label="Open profile menu"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    getInitials()
                  )}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                    {/* User Information */}
                    <div className="border-b border-gray-100 px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071B41] font-semibold text-white">
                          {getInitials()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {user?.email}
                          </p>

                          <p className="mt-1 text-xs font-medium text-[#C47D10]">
                            {getRoleName()}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Menu */}
                    <div className="py-2">

                      {/* My Profile */}
                      <button
                        type="button"
                        onClick={() =>
                          handleProfileNavigation("/profile")
                        }
                        className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <User size={17} />
                        My Profile
                      </button>

                      {/* Dashboard */}
                      <button
                        type="button"
                        onClick={() =>
                          handleProfileNavigation(getDashboardPath())
                        }
                        className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <LayoutDashboard size={17} />
                        Dashboard
                      </button>

                      {/* ADMIN */}
                      {user?.role === "admin" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleProfileNavigation("/admin/courses")
                            }
                            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <BookOpen size={17} />
                            Manage Courses
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleProfileNavigation("/admin/students")
                            }
                            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <Users size={17} />
                            Manage Students
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleProfileNavigation("/admin/instructors")
                            }
                            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <Users size={17} />
                            Manage Instructors
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleProfileNavigation("/admin/enrollments")
                            }
                            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <ClipboardList size={17} />
                            Manage Enrollments
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleProfileNavigation("/admin/messages")
                            }
                            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <MessageSquare size={17} />
                            Contact Messages
                          </button>
                        </>
                      )}

                      {/* Instructor */}
                      {user?.role === "instructor" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleProfileNavigation("/instructor/courses")
                          }
                          className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                          <BookOpen size={17} />
                          My Courses
                        </button>
                      )}

                      {/* Student */}
                      {user?.role === "student" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleProfileNavigation("/student/courses")
                          }
                          className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                          <BookOpen size={17} />
                          My Courses
                        </button>
                      )}

                      {/* Settings */}
                      <button
                        type="button"
                        onClick={() =>
                          handleProfileNavigation("/profile/settings")
                        }
                        className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <Settings size={17} />
                        Account Settings
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 py-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={handleMenuToggle}
            className="rounded-md p-2 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#071B41] px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-4">

              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-white/80 transition hover:text-[#F5A623]"
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">

                {!isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/login");
                      }}
                      className="rounded-md border border-white/30 px-4 py-2.5 text-center text-sm text-white"
                    >
                      Login
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/signup");
                      }}
                      className="rounded-md bg-[#F5A623] px-4 py-2.5 text-center text-sm font-semibold text-[#071B41]"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    {/* Mobile User Information */}
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] font-semibold text-[#071B41]">
                        {getInitials()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {user?.firstName} {user?.lastName}
                        </p>

                        <p className="text-xs text-white/50">
                          {getRoleName()}
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleProfileNavigation("/profile")
                      }
                      className="flex items-center gap-3 text-left text-sm text-white/80"
                    >
                      <User size={17} />
                      My Profile
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleProfileNavigation(getDashboardPath())
                      }
                      className="flex items-center gap-3 text-left text-sm text-white/80"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 border-t border-white/10 pt-4 text-left text-sm text-red-400"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </>
                )}

              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;