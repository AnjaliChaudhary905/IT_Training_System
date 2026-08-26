import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
} from "lucide-react";
import { useState } from "react";
import contactServices from "../../services/contactService";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Clear messages when user starts editing again
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await contactServices.createContactMessage(
                formData
            );

            setSuccessMessage(
                response.message || "Your message has been sent successfully."
            );

            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact form error:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Our Location",
            value: "Koteshwor, Kathmandu, Nepal",
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+977 9851344071",
        },
        {
            icon: Mail,
            title: "Email",
            value: "infotech@sipalaya.com",
        },
        {
            icon: Clock,
            title: "Opening Hours",
            value: "Sunday - Friday, 9:00 AM - 5:00 PM",
        },
    ];

    return (
        <main className="bg-white">

            {/* Hero */}
            <section className="bg-[#071A40] py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F9A825]">
                        Contact Us
                    </p>

                    <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
                        Let's Start Your
                        <span className="text-[#F9A825]">
                            {" "}Learning Journey
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Have a question about our courses or training
                        programs? Get in touch with our team and we'll be
                        happy to help.
                    </p>

                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:px-8">

                    {/* Contact Information */}
                    <div className="lg:col-span-2">

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            Get In Touch
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#071A40]">
                            We're Here to Help
                        </h2>

                        <p className="mt-5 leading-7 text-gray-500">
                            Whether you need information about a course,
                            enrollment, training programs, or anything else,
                            feel free to reach out to us.
                        </p>

                        <div className="mt-8 space-y-5">

                            {contactInfo.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071A40] text-[#F9A825]">
                                            <Icon size={20} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-[#071A40]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8 lg:col-span-3">

                        <h2 className="text-2xl font-bold text-[#071A40]">
                            Send Us a Message
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Fill out the form below and our team will get back
                            to you.
                        </p>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {successMessage}
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {errorMessage}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-5"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        disabled={loading}
                                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#071A40] focus:ring-1 focus:ring-[#071A40] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        disabled={loading}
                                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#071A40] focus:ring-1 focus:ring-[#071A40] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />
                                </div>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        disabled={loading}
                                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#071A40] focus:ring-1 focus:ring-[#071A40] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What can we help with?"
                                        required
                                        disabled={loading}
                                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#071A40] focus:ring-1 focus:ring-[#071A40] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />
                                </div>

                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    required
                                    disabled={loading}
                                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#071A40] focus:ring-1 focus:ring-[#071A40] disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#071A40] px-6 py-3 font-semibold text-white transition hover:bg-[#0d285c] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>

                        </form>

                    </div>

                </div>
            </section>

            {/* Map / Location */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                            Find Us
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-[#071A40]">
                            Visit Our Location
                        </h2>

                        <p className="mt-4 text-gray-500">
                            We are located in Koteshwor, Kathmandu, Nepal.
                        </p>
                    </div>

                    <div className="mt-10 flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-[#071A40]">

                        <div className="text-center text-white">
                            <MapPin
                                size={48}
                                className="mx-auto text-[#F9A825]"
                            />

                            <h3 className="mt-4 text-3xl font-semibold">
                                IT Training
                            </h3>

                            <p className="mt-2 text-slate-300 text-2xl">
                                Koteshwor, Kathmandu, Nepal
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Sipalaya+Info+Tech+Pvt.+Ltd."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center rounded-lg bg-[#F9A825] px-6 py-3 font-semibold text-white transition hover:bg-[#0d285c]"
                            >
                                Open in Google Maps
                            </a>
                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default Contact;