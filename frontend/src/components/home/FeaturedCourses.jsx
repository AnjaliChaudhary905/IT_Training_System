import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import courseServices from "../../services/courseService";
import CourseCard from "../common/CourseCard";

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const visibleCards = 3;

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await courseServices.getAllCourses();

                setCourses(response.data || []);
            } catch (error) {
                console.error(error);
                setError("Unable to load courses.");
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    const maxIndex = Math.max(
        courses.length - visibleCards,
        0
    );

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + 1, maxIndex)
        );
    };

    if (loading) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-4">
                    <div className="text-center">
                        <p className="text-gray-500">
                            Loading courses...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-4">
                    <div className="text-center">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (courses.length === 0) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-4">
                    <div className="text-center">
                        <p className="text-gray-500">
                            No courses available.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const visibleCourses = courses.slice(
        currentIndex,
        currentIndex + visibleCards
    );

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-4">

                {/* Section Header */}
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C47D10]">
                            Featured Courses
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-bold text-[#071A40] sm:text-4xl">
                            Start Learning Today
                        </h2>

                        <p className="mt-3 max-w-2xl text-gray-500">
                            Explore our popular IT training programs
                            designed to build practical and
                            industry-ready skills.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    {courses.length > visibleCards && (
                        <div className="hidden gap-2 sm:flex">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[#071A40] transition hover:bg-[#071A40] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#071A40]"
                                aria-label="Previous courses"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentIndex === maxIndex}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[#071A40] transition hover:bg-[#071A40] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#071A40]"
                                aria-label="Next courses"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Course Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                        />
                    ))}
                </div>

                {/* Mobile Navigation */}
                {courses.length > visibleCards && (
                    <div className="mt-6 flex justify-center gap-2 sm:hidden">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[#071A40] disabled:opacity-40"
                            aria-label="Previous courses"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentIndex === maxIndex}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[#071A40] disabled:opacity-40"
                            aria-label="Next courses"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedCourses;