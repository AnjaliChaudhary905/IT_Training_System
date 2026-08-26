import { Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Course Image */}
            <div className="h-52 w-full overflow-hidden">
                <img
                    src={course.image?.url}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>

            {/* Course Information */}
            <div className="p-6">

                {/* Category */}
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C47D10]">
                    {course.category}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-xl font-semibold text-[#071A40]">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                    {course.description}
                </p>

                {/* Course Details */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={16} />
                        {course.duration}
                    </div>

                    <p className="font-semibold text-[#071A40]">
                        Rs. {course.fee.toLocaleString()}
                    </p>

                </div>

                {/* View Course */}
                <button
                    type="button"
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#071A40] py-3 font-semibold text-[#071A40] transition hover:bg-[#071A40] hover:text-white"
                >
                    View Course
                    <ArrowRight size={17} />
                </button>

            </div>
        </div>
    );
};

export default CourseCard;