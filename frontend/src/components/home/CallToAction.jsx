import { ArrowRight, MessageCircle } from "lucide-react";

const CallToAction = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-[#0B2455] px-6 py-16 text-center sm:px-12 lg:px-20">

                    {/* Decorative Elements */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F9A825]/10" />
                    <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#F9A825]/10" />

                    {/* Content */}
                    <div className="relative mx-auto max-w-3xl">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F9A825]">
                            Start Learning Today
                        </p>

                        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Ready to Build Your Future?
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                            Take the next step in your career with practical,
                            industry-focused training designed to help you build
                            real-world skills.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

                            <a
                                href="/courses"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F9A825] px-7 py-3.5 font-semibold text-[#071A40] transition hover:bg-[#ffb83d]"
                            >
                                Browse All Courses
                                <ArrowRight size={19} />
                            </a>

                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-500 px-7 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/5"
                            >
                                Contact Us
                                <MessageCircle size={19} />
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;