import { Code2, Users, Briefcase, Award } from 'lucide-react';

const HighlightServices = () => {
  const pillars = [
    {
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      title: "Project-First Curriculum",
      description: "Build real-world web, cloud, and data projects to assemble a production-ready portfolio."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      title: "1-on-1 Mentorship",
      description: "Learn directly from senior software engineers and industry practitioners."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      title: "Career & Placement",
      description: "Resume optimization, technical interview prep, and direct employer referral pipelines."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "Industry Certification",
      description: "Earn accredited certifications recognized by tech companies and hiring partners."
    }
  ];

  return (
    <section className="py-16 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-blue)] mb-2">Our Educational Pillars</h2>
          <p className="text-3xl font-extrabold text-[var(--text-primary)]">Why Train at ApexTech?</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => (
            <div 
              key={index}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:bg-[var(--bg-card-hover)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 bg-[var(--bg-main)] rounded-xl w-fit border border-[var(--border-color)] shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightServices;