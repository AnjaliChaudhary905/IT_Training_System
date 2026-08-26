import {
    Target,
    Eye,
    BookOpen,
    Users,
    Laptop,
    BriefcaseBusiness,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    const features = [
        {
            icon: BookOpen,
            title: "Industry-Relevant Courses",
            description:
                "Learn technologies and skills that are relevant to today's IT industry and real-world job opportunities.",
        },
        {
            icon: Laptop,
            title: "Practical Learning",
            description:
                "Go beyond theory with hands-on exercises, projects, and practical learning experiences.",
        },
        {
            icon: Users,
            title: "Experienced Instructors",
            description:
                "Learn from instructors who can guide you through technical concepts and practical development.",
        },
        {
            icon: BriefcaseBusiness,
            title: "Career-Focused Training",
            description:
                "Build the technical skills and confidence needed to prepare for your professional IT career.",
        },
    ];

    return (
        <main className="bg-white">

            {/* Hero */}
            <section className="bg-[#071A40] py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                        About Us
                    </p>

                    <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Building Skills for a
                        <span className="text-[#F9A825]">
                            {" "}Digital Future
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        We provide practical, industry-focused IT training
                        designed to help learners develop real-world technical
                        skills and prepare for successful careers.
                    </p>

                </div>
            </section>

            {/* Introduction */}
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            Who We Are
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071A40] sm:text-4xl">
                            Learn. Practice. Build. Grow.
                        </h2>

                        <p className="mt-6 leading-8 text-gray-600">
                            Our IT Training System is designed to make
                            technology education more practical, accessible,
                            and career-oriented.
                        </p>

                        <p className="mt-4 leading-8 text-gray-600">
                            We focus on helping learners develop practical
                            knowledge through structured courses, hands-on
                            learning, and industry-relevant technologies.
                        </p>

                        <p className="mt-4 leading-8 text-gray-600">
                            Whether you are starting your journey in
                            technology or looking to strengthen your existing
                            skills, our courses are designed to help you move
                            from learning concepts to applying them in
                            real-world situations.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-[#071A40] p-8 shadow-lg sm:p-10">

                        <div className="grid gap-6 sm:grid-cols-2">

                            <div className="rounded-2xl bg-white/10 p-6">
                                <BookOpen
                                    className="text-[#F9A825]"
                                    size={32}
                                />

                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    Structured Learning
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    Organized courses that take learners
                                    through concepts step by step.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6">
                                <Laptop
                                    className="text-[#F9A825]"
                                    size={32}
                                />

                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    Hands-on Practice
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    Practice technical skills through projects
                                    and practical activities.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6">
                                <Users
                                    className="text-[#F9A825]"
                                    size={32}
                                />

                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    Guided Learning
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    Learn with guidance and support throughout
                                    your training journey.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6">
                                <BriefcaseBusiness
                                    className="text-[#F9A825]"
                                    size={32}
                                />

                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    Career Preparation
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    Develop skills that can help prepare you
                                    for professional opportunities.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            Our Purpose
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#071A40] sm:text-4xl">
                            What Drives Us
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2">

                        {/* Mission */}
                        <div className="rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825]">
                                <Target size={28} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-[#071A40]">
                                Our Mission
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                To provide practical and accessible IT
                                education that helps learners build relevant
                                technical skills, gain confidence, and prepare
                                for real-world career opportunities.
                            </p>

                        </div>

                        {/* Vision */}
                        <div className="rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825]">
                                <Eye size={28} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-[#071A40]">
                                Our Vision
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                To become a trusted platform for technology
                                learning by connecting learners with
                                practical knowledge, modern technologies, and
                                career-focused opportunities.
                            </p>

                        </div>

                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            What We Offer
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#071A40] sm:text-4xl">
                            More Than Just Online Courses
                        </h2>

                        <p className="mt-4 leading-7 text-gray-500">
                            Our approach focuses on combining knowledge,
                            practice, guidance, and career preparation.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825]">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-[#071A40]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* Learning Process */}
            <section className="bg-[#071A40] py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                            Our Approach
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            From Learning to Real-World Skills
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-4">

                        {[
                            ["01", "Learn", "Understand the concepts and fundamentals."],
                            ["02", "Practice", "Apply your knowledge through practical exercises."],
                            ["03", "Build", "Create projects that demonstrate your skills."],
                            ["04", "Grow", "Use your skills to prepare for career opportunities."],
                        ].map(([number, title, description]) => (
                            <div
                                key={number}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
                            >
                                <span className="text-4xl font-bold text-[#F9A825]">
                                    {number}
                                </span>

                                <h3 className="mt-5 text-xl font-semibold">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                    {description}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

                    <h2 className="text-3xl font-bold text-[#071A40] sm:text-4xl">
                        Ready to Start Your IT Journey?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
                        Explore our courses and start building practical
                        technical skills for your future.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link
                            to="/courses"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071A40] px-6 py-3 font-semibold text-white transition hover:bg-[#0d285c]"
                        >
                            Explore Courses
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-lg border border-[#071A40] px-6 py-3 font-semibold text-[#071A40] transition hover:bg-[#071A40] hover:text-white"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default About;