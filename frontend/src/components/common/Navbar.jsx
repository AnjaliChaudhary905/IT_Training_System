import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Courses", href: "courses" },
    { name: "Instructors", href: "instructors" },
    { name: "Contact", href: "contact" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-[#061A3A] text-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs sm:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Koteshwor, Kathmandu</span>
            <span>infotech@sipalaya.com</span>
            <span>9851344071 / 9806393939</span>
          </div>

          <div className="hidden gap-4 sm:flex">
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071B41]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
      
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5A623] text-xl font-bold text-[#071B41]">
              S
            </div>

            <div>
              <h1 className="font-serif text-base font-semibold leading-tight text-white">
                Sipalaya Info Tech
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-white/50">
                IT Training · Koteshwor
              </p>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-white/75 transition hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              Free Demo
            </a>

            <a
              href="#courses"
              className="flex items-center gap-2 rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#071B41] transition hover:bg-[#ffb43d]"
            >
              Enroll Now
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={handleMenuToggle}
            className="rounded-md p-2 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#071B41] px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-white/80 transition hover:text-[#F5A623]"
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                <a
                  href="#contact"
                  className="rounded-md border border-white/30 px-4 py-2.5 text-center text-sm text-white"
                >
                  Free Demo
                </a>

                <a
                  href="#courses"
                  className="rounded-md bg-[#F5A623] px-4 py-2.5 text-center text-sm font-semibold text-[#071B41]"
                >
                  Enroll Now
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;