import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Courses from "../pages/public/Courses";
import Instructors from "../pages/public/Instructors";
import Contact from "../pages/public/Contact";

import Login from "../pages/auth/Login";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminCourseForm from "../pages/admin/AdminCourseForm";
import AdminInstructors from "../pages/admin/AdminInstructors";
import AdminInstructorForm from "../pages/admin/AdminInstructorForm";
import AdminInstructorDetails from "../pages/admin/AdminInstructorDetails";
import AdminStudents from "../pages/admin/AdminStudents";
import AdminStudentDetails from "../pages/admin/AdminStudentDetails";
import AdminStudentForm from "../pages/admin/AdminStudentForm";
import AdminEnrollments from "../pages/admin/AdminEnrollments";
import AdminEnrollmentDetails from "../pages/admin/AdminEnrollmentDetails";
import AdminAttendance from "../pages/admin/AdminAttendance";

import InstructorLayout from "../pages/instructor/InstructorLayout";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorCourses from "../pages/instructor/InstructorCourses";
import InstructorAttendance from "../pages/instructor/InstructorAttendance";
import InstructorCourseDetails from "../pages/instructor/InstructorCourseDetails";
import InstructorProfile from "../pages/instructor/InstructorProfile";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ================= PUBLIC LAYOUT ================= */}

            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
            </Route>


            {/* ================= ADMIN ================= */}

            <Route
                element={
                    <ProtectedRoute allowedRoles={["admin"]} />
                }
            >
                <Route path="/admin" element={<AdminLayout />}>

                    <Route index element={<AdminDashboard />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="courses/new" element={<AdminCourseForm />} />
                    <Route path="courses/edit/:id" element={<AdminCourseForm />} />
                    <Route path="instructors" element={<AdminInstructors />} />
                    <Route path="instructors/edit/:id" element={<AdminInstructorForm />} />
                    <Route path="instructors/:id" element={<AdminInstructorDetails />} />
                    <Route path="students" element={<AdminStudents />} />
                    <Route path="students/:id" element={<AdminStudentDetails />} />
                    <Route path="students/edit/:id" element={<AdminStudentForm />} />
                    <Route path="enrollments" element={<AdminEnrollments />} />
                    <Route path="enrollments/:id" element={<AdminEnrollmentDetails />} />
                    <Route path="attendance" element={<AdminAttendance />} />

                </Route>
            </Route>


            {/* Instructor Portal */}
            <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
                <Route path="/instructor" element={<InstructorLayout />}>
                    <Route index element={<InstructorDashboard />} />
                    <Route path="courses" element={<InstructorCourses />} />
                    <Route path="attendance" element={<InstructorAttendance />} />
                    <Route path="courses/:courseId" element={<InstructorCourseDetails />} />
                    <Route path="profile" element={<InstructorProfile />} />
                </Route>
            </Route>


            {/* ================= STUDENT ================= */}

            <Route
                element={
                    <ProtectedRoute allowedRoles={["student"]} />
                }
            >
                <Route
                    path="/student"
                    element={
                        <div className="p-8">
                            <h1 className="text-3xl font-bold">
                                Student Dashboard
                            </h1>
                        </div>
                    }
                />
            </Route>


            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={
                    <div className="flex min-h-screen items-center justify-center">
                        <h1 className="text-2xl font-semibold">
                            404 - Page Not Found
                        </h1>
                    </div>
                }
            />

        </Routes>
    );
};

export default AppRoutes;