import CourseCard from "./CourseCard";

const CourseList = ({ courses = [] }) => {
    if (courses.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-gray-500">
                    No courses found.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard
                    key={course._id}
                    course={course}
                />
            ))}
        </div>
    );
};

export default CourseList;