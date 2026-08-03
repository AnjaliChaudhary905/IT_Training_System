import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Sparkles, Sun, Moon } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useTheme } from '../../context/theme-context';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> {SITE_CONFIG.address}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> {SITE_CONFIG.phone}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Admissions Open for ApexTech Batches
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)] tracking-tight">
          <span className="p-2 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <GraduationCap className="w-5 h-5" />
          </span>
          {SITE_CONFIG.name} <span className="text-[var(--accent-blue)]">{SITE_CONFIG.tagline}</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--text-secondary)]">
          <Link to="/courses" className="hover:text-[var(--accent-blue)] transition-colors">Courses</Link>
          <Link to="/about" className="hover:text-[var(--accent-blue)] transition-colors">About Us</Link>
          <Link to="/admission" className="hover:text-[var(--accent-blue)] transition-colors">Admissions</Link>
          <Link to="/placement" className="hover:text-[var(--accent-blue)] transition-colors">Placement</Link>
          <Link to="/blog" className="hover:text-[var(--accent-blue)] transition-colors">Insights</Link>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <Link to="/student/login" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors px-3 py-2">
            Student Portal
          </Link>
          <Link to="/admission" className="text-sm font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/20 transition-all">
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;