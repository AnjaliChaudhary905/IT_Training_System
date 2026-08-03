import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const CourseSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-8 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            <Filter className="w-4 h-4 text-[var(--accent-blue)]" />
            <span>Search & Filter ApexTech Programs</span>
          </div>
          
          <form onSubmit={handleSearch} className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5 relative">
              <input 
                type="text" 
                placeholder="Search by keyword (e.g., Python, React, Data)..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="sm:col-span-3">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">All Disciplines</option>
                <option value="Software Development">Software Development</option>
                <option value="Data & AI">Data & Artificial Intelligence</option>
                <option value="Design Systems">Design Systems & UI/UX</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2.5 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button 
                type="submit" 
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" /> Find Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CourseSearch;