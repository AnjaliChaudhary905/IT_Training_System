import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    CalendarDays,
    BookOpen,
    CheckCircle,
} from "lucide-react";

import courseServices from "../../services/courseService";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await courseServices.getCourseById(id);

                setCourse(response.data);
            } catch (error) {
                console.error(error);
                setError("Unable to load course details.");
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-20">
                <div className="mx-auto max-w-7xl animate-pulse">

                    <div className="h-8 w-32 rounded bg-gray-200" />

                    <div className="mt-10 grid gap-10 lg:grid-cols-2">
                        <div className="h-96 rounded-2xl bg-gray-200" />

                        <div>
                            <div className="h-5 w-40 rounded bg-gray-200" />
                            <div className="mt-4 h-12 w-3/4 rounded bg-gray-200" />
                            <div className="mt-5 h-20 w-full rounded bg-gray-200" />
                        </div>
                    </div>

                </div>
            </main>
        );
    }

    if (error || !course) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

                <div className="text-center">

                    <h2 className="text-2xl font-bold text-[#071A40]">
                        Course Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {error || "The requested course could not be found."}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/courses")}
                        className="mt-6 rounded-lg bg-[#071A40] px-6 py-3 font-semibold text-white transition hover:bg-[#0B2A61]"
                    >
                        Browse Courses
                    </button>

                </div>

            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Back Button */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">

                    <button
                        type="button"
                        onClick={() => navigate("/courses")}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#071A40]"
                    >
                        <ArrowLeft size={18} />
                        Back to Courses
                    </button>

                </div>
            </section>

            {/* Course Header */}
            <section className="bg-[#071A40] px-6 py-14 text-white lg:px-8">

                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">

                    {/* Course Information */}
                    <div>

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                            {course.category}
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            {course.title}
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                            {course.description}
                        </p>

                        {/* Course Meta */}
                        <div className="mt-8 flex flex-wrap gap-6">

                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <Clock
                                    size={18}
                                    className="text-[#F9A825]"
                                />
                                {course.duration}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <BookOpen
                                    size={18}
                                    className="text-[#F9A825]"
                                />
                                {course.level}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <CalendarDays
                                    size={18}
                                    className="text-[#F9A825]"
                                />
                                Enrollment Open
                            </div>

                        </div>

                    </div>

                    {/* Course Image */}
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                        <img
                            src={course.image?.url}
                            alt={course.title}
                            className="h-80 w-full object-cover lg:h-96"
                        />
                    </div>

                </div>

            </section>

            {/* Course Content */}
            <section className="px-6 py-14 lg:px-8">

                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">

                    {/* Main Content */}
                    <div className="lg:col-span-2">

                        {/* Description */}
                        <div className="rounded-2xl bg-white p-7 shadow-sm">

                            <h2 className="text-2xl font-bold text-[#071A40]">
                                About This Course
                            </h2>

                            <p className="mt-4 leading-7 text-gray-600">
                                {course.description}
                            </p>

                        </div>

                        {/* Syllabus */}
                        <div className="mt-7 rounded-2xl bg-white p-7 shadow-sm">

                            <h2 className="text-2xl font-bold text-[#071A40]">
                                What You Will Learn
                            </h2>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                {course.syllabus?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle
                                            size={19}
                                            className="mt-0.5 shrink-0 text-[#C47D10]"
                                        />

                                        <span className="text-sm text-gray-600">
                                            {item}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* Prerequisites */}
                        {course.prerequisites?.length > 0 && (
                            <div className="mt-7 rounded-2xl bg-white p-7 shadow-sm">

                                <h2 className="text-2xl font-bold text-[#071A40]">
                                    Prerequisites
                                </h2>

                                <ul className="mt-5 space-y-3">

                                    {course.prerequisites.map(
                                        (item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm text-gray-600"
                                            >
                                                <CheckCircle
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-[#C47D10]"
                                                />

                                                {item}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>
                        )}

                    </div>

                    {/* Enrollment Card */}
                    <aside>

                        <div className="sticky top-24 rounded-2xl bg-white p-7 shadow-lg">

                            <p className="text-sm font-medium text-gray-500">
                                Course Fee
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#071A40]">
                                Rs. {course.fee?.toLocaleString()}
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="space-y-4">

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Duration
                                    </span>

                                    <span className="font-medium text-[#071A40]">
                                        {course.duration}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Level
                                    </span>

                                    <span className="font-medium text-[#071A40]">
                                        {course.level}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Deadline
                                    </span>

                                    <span className="font-medium text-[#071A40]">
                                        {new Date(
                                            course.enrollmentDeadline
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="mt-7 w-full rounded-xl bg-[#C47D10] py-3.5 font-semibold text-white transition hover:bg-[#A9670D]"
                            >
                                Enroll Now
                            </button>

                        </div>

                    </aside>

                </div>

            </section>

        </main>
    );
};

export default CourseDetails;