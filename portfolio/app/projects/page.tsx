export default function Projects() {
  const projects = [
    { title: "Next.js App Router", category: "Web Application", bg: "bg-primary text-cream" },
    { title: "Tailwind Design System", category: "UI Architecture", bg: "bg-secondary text-cream" },
    { title: "Accessibility Suite", category: "WCAG Compliance", bg: "bg-accent text-accent-foreground" },
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Projects Gallery
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight">Projects</h1>
        <p className="text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Featured projects showcasing Next.js App Router, TypeScript, and custom Tailwind tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`${project.bg} p-6 rounded-xl shadow-md space-y-4 hover:translate-y-[-2px] transition-transform duration-200`}
          >
            <span className="text-xs uppercase font-bold tracking-widest opacity-80">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button className="px-4 py-2 text-xs font-bold rounded-lg bg-surface text-primary hover:bg-hover hover:text-hover-foreground transition-colors shadow-sm">
              View Case Study
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
