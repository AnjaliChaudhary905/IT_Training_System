import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

const HeroSection = () => {
  return (
    <section className="bg-[var(--bg-main)] border-b border-[var(--border-color)] py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-[var(--accent-blue)]">
              <ShieldCheck className="w-4 h-4" />
              <span>Industry Accredited Tech Academy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15]">
              Empowering the Next Generation of <br />
              <span className="text-[var(--accent-blue)]">Software Engineers</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {SITE_CONFIG.heroSubtitle}
            </p>

            {/* Value Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Practical & Project-Based Curriculum</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct Corporate Placement Assistance</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                to="/courses" 
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                Explore Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/admission" 
                className="px-6 py-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                Enrollment Details
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl overflow-hidden transition-colors">
              <div className="bg-slate-900 px-4 py-3 text-white flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" /> ApexTech Career Pipeline
                </span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>

              <div className="p-6 space-y-4 text-xs font-medium">
                <div className="p-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Track 01</span>
                  <span className="font-bold text-[var(--text-primary)]">Full-Stack Engineering (React + Django)</span>
                </div>
                <div className="p-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Track 02</span>
                  <span className="font-bold text-[var(--text-primary)]">Data Analytics & Machine Learning</span>
                </div>
                <div className="p-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Track 03</span>
                  <span className="font-bold text-[var(--text-primary)]">UI/UX & Product Design Systems</span>
                </div>

                <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[var(--text-secondary)]">
                  <span>Admissions Open for Next Batch</span>
                  <Link to="/admission" className="text-[var(--accent-blue)] font-bold hover:underline">Apply Today →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;