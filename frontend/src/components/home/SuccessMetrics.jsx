const metrics = [
    {
        value: "500+",
        label: "Students Trained",
    },
    {
        value: "20+",
        label: "Courses Available",
    },
    {
        value: "15+",
        label: "Expert Instructors",
    },
    {
        value: "90%",
        label: "Student Satisfaction",
    },
];

const SuccessMetrics = () => {
    return (
        <section className="bg-white py-16 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-6">

                <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/15">

                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="text-center lg:px-8"
                        >
                            <p className="font-serif text-4xl font-bold text-[#F9A825] sm:text-5xl">
                                {metric.value}
                            </p>

                            <p className="mt-2 text-sm font-medium text-[#071A40] sm:text-base">
                                {metric.label}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default SuccessMetrics;