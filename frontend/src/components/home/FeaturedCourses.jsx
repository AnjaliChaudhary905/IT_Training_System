import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from '../common/CourseCard';

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-blue)] mb-2">Featured Programs</h2>
            <p className="text-3xl font-extrabold text-[var(--text-primary)]">Explore Industry Bootcamps</p>
          </div>
          <Link to="/courses" className="text-sm font-semibold text-[var(--accent-blue)] hover:underline flex items-center gap-1.5">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <CourseCard 
            title="Full-Stack Web Development (React + Django)"
            category="Software Dev"
            level="Intermediate"
            duration="12 Weeks"
            fee="NPR 28,000"
            rating="4.9"
          />
          <CourseCard 
            title="Data Science & Machine Learning with Python"
            category="Data & AI"
            level="Beginner"
            duration="10 Weeks"
            fee="NPR 24,000"
            rating="4.8"
          />
          <CourseCard 
            title="UI/UX & Product Design Systems"
            category="Design Systems"
            level="All Levels"
            duration="8 Weeks"
            fee="NPR 20,000"
            rating="4.7"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;