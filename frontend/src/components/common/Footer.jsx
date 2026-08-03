import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
            <span className="p-2 bg-blue-600 text-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </span>
            {SITE_CONFIG.name} <span className="text-blue-400">{SITE_CONFIG.tagline}</span>
          </Link>
          <p className="text-slate-400 leading-relaxed pr-4">
            Advancing technical expertise through project-first training, professional certifications, and corporate career pathways.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/courses" className="hover:text-white transition-colors">All Programs</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/admission" className="hover:text-white transition-colors">Admissions</Link></li>
            <li><Link to="/placement" className="hover:text-white transition-colors">Career Placement</Link></li>
          </ul>
        </div>

        {/* Popular Tracks */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Popular Tracks</h4>
          <ul className="space-y-2">
            <li><Link to="/courses" className="hover:text-white transition-colors">Full-Stack Web Dev</Link></li>
            <li><Link to="/courses" className="hover:text-white transition-colors">Data Science & AI</Link></li>
            <li><Link to="/courses" className="hover:text-white transition-colors">UI/UX & Product Design</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{SITE_CONFIG.email}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;