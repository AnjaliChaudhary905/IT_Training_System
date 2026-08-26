import { useEffect, useState ,useMemo} from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import courseServices from "../../services/courseService";
import CourseCard from "./CourseCard";

const CourseSearch = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load courses and categories
    useEffect(() => {
        const loadInitialData = async () => {
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

                setError(
                    "Unable to load courses. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Filter courses
    const filteredCourses = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesCategory =
                !selectedCategory ||
                course.category === selectedCategory;

            const matchesSearch =
                !search ||
                course.title?.toLowerCase().includes(search) ||
                course.description?.toLowerCase().includes(search) ||
                course.category?.toLowerCase().includes(search);

            return matchesCategory && matchesSearch;
        });
    }, [courses, searchTerm, selectedCategory]);

    // Number of visible cards
    const visibleCards = 3;

    // Maximum starting index
    const maxIndex = Math.max(
        filteredCourses.length - visibleCards,
        0
    );

    // Next slide
    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev < maxIndex ? prev + 1 : 0
        );
    };

    // Previous slide
    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : maxIndex
        );
    };

    // Search change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentIndex(0);
    };

    // Category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentIndex(0);
    };

    // Clear filters
    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setCurrentIndex(0);
    };

    // Courses currently visible
    const visibleCourses = filteredCourses.slice(
        currentIndex,
        currentIndex + visibleCards
    );

    return (
        <section
            id="courses"
            className="bg-[#F7F5EE] px-5 py-16 sm:px-8 lg:py-20"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C47D10]">
                        Explore Courses
                    </p>

                    <h2 className="mt-2 font-serif text-3xl font-semibold text-[#071B41] sm:text-4xl">
                        Find the right course for you.
                    </h2>
                </div>

                {/* Search and Category */}
                <div className="mb-10 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
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
                                onChange={handleSearchChange}
                                placeholder="Search courses..."
                                className="h-14 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-12 pr-4 text-gray-700 outline-none transition focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/20"
                            />
                        </div>

                        {/* Category */}
                        <div className="relative w-full md:w-72">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 pr-10 text-gray-700 outline-none transition focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/20"
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
                                size={19}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchTerm || selectedCategory) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">

                            <span>
                                Showing results for:
                            </span>

                            {searchTerm && (
                                <span className="rounded-full bg-[#071A40] px-3 py-1 text-white">
                                    "{searchTerm}"
                                </span>
                            )}

                            {selectedCategory && (
                                <span className="rounded-full bg-[#F9A825] px-3 py-1 text-[#071A40]">
                                    {selectedCategory}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="ml-1 font-medium text-[#C47D10] hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="py-12 text-center text-gray-500">
                        Loading courses...
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
                        {error}
                    </div>
                )}

                {/* Courses */}
                {!loading && !error && (
                    <>
                        {/* Course Heading + Navigation */}
                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <h3 className="font-serif text-2xl font-semibold text-[#071A40]">
                                    Popular Courses
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Explore our most recent training programs.
                                </p>
                            </div>

                            {/* Navigation */}
                            {filteredCourses.length > visibleCards && (
                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071A40] text-[#071A40] transition hover:bg-[#071A40] hover:text-white"
                                        aria-label="Previous courses"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A40] text-white transition hover:bg-[#102b5c]"
                                        aria-label="Next courses"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                </div>
                            )}
                        </div>

                        {/* No Results */}
                        {filteredCourses.length === 0 ? (
                            <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

                                <Search
                                    size={40}
                                    className="mx-auto mb-4 text-gray-300"
                                />

                                <h3 className="font-serif text-xl font-semibold text-[#071A40]">
                                    No courses found
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Try another search term or choose
                                    a different category.
                                </p>

                            </div>
                        ) : (
                            <>
                                {/* Course Cards */}
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {visibleCourses.map((course) => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                        />
                                    ))}
                                </div>

                                {/* Carousel Indicator */}
                                {filteredCourses.length > visibleCards && (
                                    <div className="mt-8 flex justify-center gap-2">

                                        {Array.from({
                                            length: maxIndex + 1,
                                        }).map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    setCurrentIndex(index)
                                                }
                                                className={`h-2 rounded-full transition-all ${
                                                    index === currentIndex
                                                        ? "w-6 bg-[#071A40]"
                                                        : "w-2 bg-gray-300"
                                                }`}
                                                aria-label={`Go to slide ${
                                                    index + 1
                                                }`}
                                            />
                                        ))}

                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CourseSearch;