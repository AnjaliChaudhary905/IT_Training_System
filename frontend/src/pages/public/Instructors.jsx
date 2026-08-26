import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle,
} from "lucide-react";

const instructors = [
    {
        id: 1,
        name: "Senior MERN Instructor",
        role: "Full Stack Development Instructor",
        experience: "6+ Years Experience",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        bio: "Experienced full-stack developer and trainer specializing in modern web application development and practical industry projects.",
        subjects: [
            "JavaScript",
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
        ],
    },
    {
        id: 2,
        name: "Python & Django Instructor",
        role: "Python Development Instructor",
        experience: "5+ Years Experience",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        bio: "Passionate Python developer focused on backend development, REST APIs, database integration, and building real-world applications.",
        subjects: [
            "Python",
            "Django",
            "REST API",
            "PostgreSQL",
            "Backend Development",
        ],
    },
    {
        id: 3,
        name: "Data Science Instructor",
        role: "Data Science & AI Instructor",
        experience: "5+ Years Experience",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        bio: "Data-focused instructor helping students understand Python, data analysis, visualization, machine learning, and practical AI applications.",
        subjects: [
            "Python",
            "Data Analysis",
            "Machine Learning",
            "Pandas",
            "Data Visualization",
        ],
    },
    {
        id: 4,
        name: "UI/UX & Design Instructor",
        role: "UI/UX Design Instructor",
        experience: "4+ Years Experience",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        bio: "Creative designer and trainer focused on user-centered design, visual communication, prototyping, and modern design workflows.",
        subjects: [
            "UI/UX Design",
            "Figma",
            "Wireframing",
            "Prototyping",
            "Graphic Design",
        ],
    },
];
const Instructors = () => {
    return (
        <main className="bg-white">

            {/* Hero Section */}
            <section className="bg-[#071A40] py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                        Our Instructors
                    </p>

                    <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
                        Learn From
                        <span className="text-[#F9A825]">
                            {" "}Industry-Focused Instructors
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Learn from experienced professionals who combine
                        technical knowledge with practical industry
                        experience to help you build career-ready skills.
                    </p>

                </div>
            </section>

            {/* Instructor Cards */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            Meet The Team
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#071A40] sm:text-4xl">
                            Experienced Professionals
                        </h2>

                        <p className="mt-4 leading-7 text-gray-500">
                            Our instructors focus on practical learning,
                            real-world projects, and the skills employers
                            actually look for.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        {instructors.map((instructor) => (
                            <div
                                key={instructor.id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                {/* Image */}
                                <div className="h-64 overflow-hidden bg-gray-100">
                                    <img
                                        src={instructor.image}
                                        alt={instructor.name}
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Information */}
                                <div className="p-6">

                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C47D10]">
                                        <Briefcase size={14} />
                                        Instructor
                                    </div>

                                    <h3 className="mt-2 text-xl font-bold text-[#071A40]">
                                        {instructor.name}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                        {instructor.role}
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                        <Award
                                            size={16}
                                            className="text-[#C47D10]"
                                        />
                                        {instructor.experience}
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-gray-500">
                                        {instructor.bio}
                                    </p>

                                    {/* Subjects */}
                                    <div className="mt-5 border-t border-gray-100 pt-5">

                                        <div className="flex items-center gap-2">
                                            <BookOpen
                                                size={16}
                                                className="text-[#C47D10]"
                                            />

                                            <h4 className="text-sm font-semibold text-[#071A40]">
                                                Subjects
                                            </h4>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            {instructor.subjects.map(
                                                (subject) => (
                                                    <span
                                                        key={subject}
                                                        className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                                                    >
                                                        {subject}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* Why Learn From Our Instructors */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                                Why Learn With Us
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-[#071A40] sm:text-4xl">
                                More Than Just Classroom Training
                            </h2>

                            <p className="mt-5 leading-7 text-gray-500">
                                Our instructors focus on helping students
                                understand how technology is actually used
                                in professional environments.
                            </p>

                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {[
                                "Industry-focused curriculum",
                                "Practical project-based learning",
                                "Real-world development practices",
                                "Career-oriented technical guidance",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                                >
                                    <CheckCircle
                                        size={20}
                                        className="mt-0.5 shrink-0 text-[#C47D10]"
                                    />

                                    <p className="text-sm font-medium leading-6 text-[#071A40]">
                                        {item}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#071A40] py-20 text-white">
                <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">

                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to Build Your Skills?
                    </h2>

                    <p className="mt-4 leading-7 text-slate-300">
                        Explore our training programs and start learning
                        with experienced instructors.
                    </p>

                    <a
                        href="/courses"
                        className="mt-8 inline-flex items-center rounded-lg bg-[#F9A825] px-7 py-3 font-semibold text-white transition hover:bg-[#d99016]"
                    >
                        Explore Courses
                    </a>

                </div>
            </section>

        </main>
    );
};

export default Instructors;