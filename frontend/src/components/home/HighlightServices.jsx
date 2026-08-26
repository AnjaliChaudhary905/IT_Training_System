import {
    BriefcaseBusiness,
    Code2,
    GraduationCap,
    Users,
} from "lucide-react";

const services = [
    {
        icon: GraduationCap,
        title: "Industry-Focused Training",
        description:
            "Learn practical skills based on real industry requirements and current technologies.",
    },
    {
        icon: Code2,
        title: "Hands-On Projects",
        description:
            "Build real-world projects that help you turn concepts into practical experience.",
    },
    {
        icon: Users,
        title: "Expert Instructors",
        description:
            "Learn from experienced instructors who provide practical guidance throughout your training.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Career-Oriented Learning",
        description:
            "Develop job-ready skills and confidence to take the next step in your technology career.",
    },
];

const HighlightServices = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-6">

                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C47D10]">
                        Why Choose Us
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-bold text-[#071A40] sm:text-4xl">
                        Learn Skills That Move You Forward
                    </h2>

                    <p className="mt-4 text-base leading-7 text-gray-500">
                        We combine practical training, experienced instructors,
                        and real-world projects to help you build skills that
                        matter in today's technology industry.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className="group rounded-2xl border border-gray-100 bg-white p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#F9A825]/40 hover:shadow-lg"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825] transition duration-300 group-hover:bg-[#F9A825] group-hover:text-[#071A40]">
                                    <Icon size={27} strokeWidth={1.8} />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-[#071A40]">
                                    {service.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HighlightServices;