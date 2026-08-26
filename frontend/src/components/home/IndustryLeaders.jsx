const companies = [
    {
        name: "Leapfrog Technology",
        website: "https://www.lftechnology.com.np/",
        logo: "https://www.google.com/s2/favicons?domain=lftechnology.com.np&sz=128",
    },
    {
        name: "F1Soft",
        website: "https://f1soft.com/",
        logo: "https://www.google.com/s2/favicons?domain=f1soft.com&sz=128",
    },
    {
        name: "CloudFactory",
        website: "https://www.cloudfactory.com/",
        logo: "https://www.google.com/s2/favicons?domain=cloudfactory.com&sz=128",
    },
    {
        name: "Fusemachines",
        website: "https://fusemachines.com/",
        logo: "https://www.google.com/s2/favicons?domain=fusemachines.com&sz=128",
    },
    {
        name: "Verisk",
        website: "https://www.verisk.com/",
        logo: "https://www.google.com/s2/favicons?domain=verisk.com&sz=128",
    },
    {
        name: "Cotiviti",
        website: "https://www.cotiviti.com/",
        logo: "https://www.google.com/s2/favicons?domain=cotiviti.com&sz=128",
    },
    {
        name: "LogPoint",
        website: "https://www.logpoint.com/",
        logo: "https://www.google.com/s2/favicons?domain=logpoint.com&sz=128",
    },
    {
        name: "YoungInnovations",
        website: "https://younginnovations.com.np/",
        logo: "https://www.google.com/s2/favicons?domain=younginnovations.com.np&sz=128",
    },
    {
        name: "Deerwalk",
        website: "https://deerwalk.com/",
        logo: "https://www.google.com/s2/favicons?domain=deerwalk.com&sz=128",
    },
    {
        name: "YCO",
        website: "https://www.yco.com.np/",
        logo: "https://www.google.com/s2/favicons?domain=yco.com.np&sz=128",
    },
];

const CompanyCard = ({ company }) => {
    return (
        <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${company.name}`}
            className="group flex h-36 w-48 shrink-0 flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
        >
            {/* Logo */}
            <div className="flex h-16 w-full items-center justify-center">
                <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-14 w-14 object-contain opacity-90 transition duration-300 group-hover:scale-110"
                />
            </div>

            {/* Company Name */}
            <p className="mt-3 text-center text-sm font-semibold text-[#071A40] transition group-hover:text-[#C47D10]">
                {company.name}
            </p>
        </a>
    );
};

const IndustryLeaders = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#C47D10]">
                        Industry Leaders
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071A40] sm:text-4xl">
                        Learn Skills That Matter in Today's Tech Industry
                    </h2>

                    <p className="mt-4 text-base leading-7 text-gray-500">
                        Build practical skills and prepare yourself for opportunities
                        in leading technology companies around the world.
                    </p>
                </div>

                {/* Company Logos */}
                <div className="relative mt-14 overflow-hidden">

                    {/* Left Fade */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />

                    {/* Right Fade */}
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

                    <div className="flex w-max animate-[scroll_30s_linear_infinite] gap-6 hover:[animation-play-state:paused]">

                        {/* First Set */}
                        {companies.map((company) => (
                            <CompanyCard
                                key={company.name}
                                company={company}
                            />
                        ))}

                        {/* Duplicate Set */}
                        {companies.map((company, index) => (
                            <CompanyCard
                                key={`${company.name}-duplicate-${index}`}
                                company={company}
                            />
                        ))}

                    </div>
                </div>

                {/* Bottom Message */}
                <p className="mt-8 text-center text-sm text-gray-400">
                    Industry technologies • Practical skills • Career-focused learning
                </p>

            </div>
        </section>
    );
};

export default IndustryLeaders;