import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const CourseCard = ({ title, category, level, duration, fee, rating }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:bg-[var(--bg-card-hover)] transition-all flex flex-col justify-between">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-blue-500/10 text-[var(--accent-blue)] border border-blue-500/20 text-xs font-bold rounded-md">
            {category}
          </span>
          <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rating}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
        
        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {duration}</span>
          <span>•</span>
          <span>Level: {level}</span>
        </div>
      </div>

      <div className="p-6 bg-[var(--bg-main)] border-t border-[var(--border-color)] flex items-center justify-between">
        <div>
          <p className="text-[11px] text-[var(--text-secondary)] uppercase font-bold">Tuition Fee</p>
          <p className="text-base font-extrabold text-[var(--text-primary)]">{fee}</p>
        </div>
        <Link to="/courses" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;