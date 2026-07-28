import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-12">
      {/* Hero Header */}
      <div className="space-y-4">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Custom Color Tokens Active
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight leading-tight">
          Home
        </h1>
        <p className="text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Welcome to the portfolio application powered by custom semantic design tokens (Maroon, Brown, Ochre, Gold, Cream).
        </p>
      </div>

      {/* Featured Palette Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Maroon Primary Card */}
        <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-md space-y-3 border border-maroon">
          <div className="text-xs uppercase font-bold tracking-widest text-gold">
            Primary Token (#800000)
          </div>
          <h2 className="text-xl font-bold text-cream">Maroon Tone</h2>
          <p className="text-sm text-cream/90 leading-relaxed">
            Used for headers, brand identity, and dark emphasis. High-contrast light cream text ensured.
          </p>
        </div>

        {/* Brown Secondary Card */}
        <div className="bg-secondary text-secondary-foreground p-6 rounded-xl shadow-md space-y-3 border border-brown">
          <div className="text-xs uppercase font-bold tracking-widest text-gold">
            Secondary Token (#633A2C)
          </div>
          <h2 className="text-xl font-bold text-cream">Brown Tone</h2>
          <p className="text-sm text-cream/90 leading-relaxed">
            Used for structural section containers, cards, and secondary UI components.
          </p>
        </div>

        {/* Gold Accent Card */}
        <div className="bg-accent text-accent-foreground p-6 rounded-xl shadow-md space-y-3 border border-gold">
          <div className="text-xs uppercase font-bold tracking-widest text-primary">
            Accent Token (#B8860B)
          </div>
          <h2 className="text-xl font-bold">Gold Accent</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Vibrant highlight tone for callouts, action badges, and status elements. Readable dark text.
          </p>
        </div>
      </div>

      {/* Interactive Actions & Hover State Demo */}
      <div className="bg-surface p-8 rounded-2xl shadow-inner border border-brown/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-primary">Explore Portfolio Sections</h3>
          <p className="text-sm text-brown mt-1">
            Test button hover states using Ochre (#B88A2C) and transition animations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-cream bg-primary hover:bg-hover hover:text-hover-foreground transition-all duration-200 shadow-md text-sm"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-accent-foreground bg-accent hover:bg-hover hover:text-hover-foreground transition-all duration-200 shadow-md"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
