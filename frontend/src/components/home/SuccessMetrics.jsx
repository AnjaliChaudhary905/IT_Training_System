import { GraduationCap, Award, Building2, Users } from 'lucide-react';

const SuccessMetrics = () => {
  const metrics = [
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />,
      value: "3,500+",
      label: "Engineers Graduated"
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      value: "96%",
      label: "Course Completion Rate"
    },
    {
      icon: <Building2 className="w-5 h-5 text-emerald-500" />,
      value: "80+",
      label: "Hiring Partners"
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      value: "92%",
      label: "Placement Rate"
    }
  ];

  return (
    <section className="py-12 bg-[var(--bg-card)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {metrics.map((item, index) => (
            <div 
              key={index} 
              className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2.5 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{item.value}</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;