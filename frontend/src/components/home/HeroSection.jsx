import { ArrowRight, PlayCircle } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section className="bg-[#071A40] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-8 lg:px-4 lg:pt-20 lg:pb-8">

        <div className="mx-auto max-w-5xl">

          {/* Eyebrow */}
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.25em] text-[#F9A825]">
            IT Training · Koteshwor, Kathmandu
          </p>

          {/* Main Heading */}
          <h1 className="text-center font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-start lg:text-7xl">
            Grow Your Skills,
          </h1>

          <h1 className="text-center font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-end lg:text-7xl">
            Define Your Future.
          </h1>

          {/* Description + Buttons */}
          <div className="mt-8 flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-start">

            <p className="max-w-xl text-center text-base leading-7 text-slate-400 sm:text-lg lg:text-left">
              Learn practical programming, web development, data science and
              design skills through industry-focused training and real-world
              projects.
            </p>

            <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:items-center">

              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#F9A825] px-7 py-3.5 font-semibold text-[#071A40] transition hover:bg-[#ffb83d]"
              >
                Explore Courses
                <ArrowRight size={19} />
              </a>

              <button
                type="button"
                onClick={()=>navigate("/about")}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-slate-500 px-7 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                <PlayCircle size={19} />
                Learn More
              </button>

            </div>
          </div>
        </div>

        {/* Hero Image Carousel */}
        <div className="mt-10">
          <HeroCarousel />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;