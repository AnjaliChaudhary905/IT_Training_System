import { MapPin, Phone, Mail } from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#071A40] text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold">
                            IT
                            <span className="text-[#F9A825]">
                                Training
                            </span>
                        </h2>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                            Practical, industry-focused training designed
                            to help students build real-world technical
                            skills and prepare for successful careers.
                        </p>

                        {/* Social Media */}
                        <div className="mt-6 flex gap-3">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-[#F9A825] hover:bg-[#F9A825] hover:text-[#071A40]"
                            >
                                <FaFacebookF size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-[#F9A825] hover:bg-[#F9A825] hover:text-[#071A40]"
                            >
                                <FaInstagram size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-[#F9A825] hover:bg-[#F9A825] hover:text-[#071A40]"
                            >
                                <FaLinkedinIn size={17} />
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F9A825]">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-slate-400">

                            <li>
                                <a
                                    href="/"
                                    className="transition hover:text-white"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/courses"
                                    className="transition hover:text-white"
                                >
                                    Courses
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/about"
                                    className="transition hover:text-white"
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/contact"
                                    className="transition hover:text-white"
                                >
                                    Contact
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Popular Courses */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F9A825]">
                            Popular Courses
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-slate-400">

                            <li>
                                <a
                                    href="/courses"
                                    className="transition hover:text-white"
                                >
                                    MERN Stack Development
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/courses"
                                    className="transition hover:text-white"
                                >
                                    Python with Django
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/courses"
                                    className="transition hover:text-white"
                                >
                                    Data Science with Python
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/courses"
                                    className="transition hover:text-white"
                                >
                                    Graphic Design
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F9A825]">
                            Contact Us
                        </h3>

                        <div className="mt-5 space-y-4 text-sm text-slate-400">

                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#F9A825]"
                                />

                                <span>
                                    Koteshwor, Kathmandu,
                                    <br />
                                    Nepal
                                </span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-[#F9A825]"
                                />

                                <a
                                    href="tel:+9779851344071"
                                    className="transition hover:text-white"
                                >
                                    +977 9851344071
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#F9A825]"
                                />

                                <a
                                    href="mailto:infotech@sipalaya.com"
                                    className="break-all transition hover:text-white"
                                >
                                    infotech@sipalaya.com
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">

                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">

                    {/* Copyright */}
                    <p>
                        © {new Date().getFullYear()} IT Training.
                        All rights reserved.
                    </p>

                    {/* Legal Links */}
                    <div className="flex justify-center gap-6 sm:justify-end">

                        <a
                            href="#"
                            className="transition hover:text-white"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-white"
                        >
                            Terms & Conditions
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;