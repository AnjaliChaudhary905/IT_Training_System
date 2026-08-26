import { useEffect, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";

import courseServices from "../../services/courseService";
import CourseCard from "../../components/common/CourseCard";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load courses and categories
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [coursesResponse, categoriesResponse] =
                    await Promise.all([
                        courseServices.getAllCourses(),
                        courseServices.getCourseCategories(),
                    ]);

                setCourses(coursesResponse.data || []);
                setCategories(categoriesResponse.data || []);
            } catch (error) {
                console.error(error);
                setError("Unable to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Category filtering
    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);

        try {
            setLoading(true);
            setError("");

            if (!category) {
                const response = await courseServices.getAllCourses();
                setCourses(response.data || []);
                return;
            }

            const response =
                await courseServices.getCoursesBycategories(category);

            setCourses(response.data || []);
        } catch (error) {
            console.error(error);
            setError("Unable to filter courses.");
        } finally {
            setLoading(false);
        }
    };

    // Search filtering
    const filteredCourses = courses.filter((course) => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) return true;

        return (
            course.title?.toLowerCase().includes(search) ||
            course.description?.toLowerCase().includes(search) ||
            course.category?.toLowerCase().includes(search) ||
            course.level?.toLowerCase().includes(search)
        );
    });

    // Clear filters
    const clearFilters = async () => {
        setSearchTerm("");
        setSelectedCategory("");

        try {
            setLoading(true);

            const response = await courseServices.getAllCourses();

            setCourses(response.data || []);
        } catch (error) {
            console.error(error);
            setError("Unable to load courses.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Page Header */}
            <section className="bg-[#071A40] px-6 py-20 text-white">
                <div className="mx-auto max-w-7xl text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                        Our Courses
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        Explore Our Courses
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
                        Learn practical, industry-focused skills through
                        courses designed to prepare you for real-world
                        technology careers.
                    </p>

                </div>
            </section>

            {/* Search & Filters */}
            <section className="px-6 py-10 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <div className="rounded-2xl bg-white p-5 shadow-sm">

                        <div className="flex flex-col gap-4 md:flex-row">

                            {/* Search */}
                            <div className="relative flex-1">

                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search courses..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-[#071A40] focus:bg-white focus:ring-2 focus:ring-[#071A40]/10"
                                />

                            </div>

                            {/* Category Dropdown */}
                            <div className="relative md:w-64">

                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        handleCategoryChange(
                                            e.target.value
                                        )
                                    }
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-10 text-sm outline-none transition focus:border-[#071A40] focus:bg-white focus:ring-2 focus:ring-[#071A40]/10"
                                >

                                    <option value="">
                                        All Categories
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                            </div>

                            {/* Clear Button */}
                            {(searchTerm || selectedCategory) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-[#071A40] hover:text-[#071A40]"
                                >
                                    <X size={17} />
                                    Clear
                                </button>
                            )}

                        </div>

                    </div>

                </div>
            </section>

            {/* Courses */}
            <section className="px-6 pb-20 lg:px-8">

                <div className="mx-auto max-w-7xl">

                    {/* Results Header */}
                    <div className="mb-7 flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-bold text-[#071A40]">
                                Available Courses
                            </h2>

                            {!loading && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredCourses.length}{" "}
                                    {filteredCourses.length === 1
                                        ? "course"
                                        : "courses"}{" "}
                                    available
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-8 rounded-xl border border-red-100 bg-red-50 p-5 text-center text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-[470px] animate-pulse rounded-2xl bg-gray-200"
                                />
                            ))}

                        </div>
                    ) : filteredCourses.length > 0 ? (

                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredCourses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                />
                            ))}

                        </div>

                    ) : (

                        /* Empty State */
                        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <Search
                                    size={28}
                                    className="text-gray-400"
                                />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#071A40]">
                                No courses found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                We couldn't find any courses matching your
                                search or selected category.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-6 rounded-lg bg-[#071A40] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2A61]"
                            >
                                View All Courses
                            </button>

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
};

export default Courses;