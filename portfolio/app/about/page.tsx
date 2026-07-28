export default function About() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          About Page
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight">About</h1>
        <p className="text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Crafting modern web applications with focus on design tokens, accessibility, and high performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-brown/20 shadow-sm space-y-2">
          <h2 className="text-xl font-bold text-primary">Design Tokens & Palette</h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Every component uses semantic color tokens mapped to our custom palette: Maroon (#800000), Brown (#633A2C), Ochre (#B88A2C), Gold (#B8860B), and Cream (#E0D6B8).
          </p>
        </div>

        <div className="bg-secondary text-secondary-foreground p-6 rounded-xl shadow-md space-y-2">
          <h2 className="text-xl font-bold text-cream">Accessibility & Readability</h2>
          <p className="text-sm text-cream/90 leading-relaxed">
            All text combinations adhere strictly to WCAG contrast standards, maintaining high legibility across dark and light surfaces.
          </p>
        </div>
      </div>
    </section>
  );
}
