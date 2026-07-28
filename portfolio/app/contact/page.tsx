export default function Contact() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight">Contact</h1>
        <p className="text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Send a message to discuss new projects, collaborations, or opportunities.
        </p>
      </div>

      <div className="max-w-xl bg-surface p-8 rounded-2xl border border-brown/20 shadow-md space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-primary">Your Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-lg border border-brown/30 bg-cream/50 text-foreground placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-primary">Email Address</label>
          <input
            type="email"
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-lg border border-brown/30 bg-cream/50 text-foreground placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-primary">Message</label>
          <textarea
            rows={4}
            placeholder="Let's build something together..."
            className="w-full px-4 py-3 rounded-lg border border-brown/30 bg-cream/50 text-foreground placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-gold"
          ></textarea>
        </div>

        <button
          type="button"
          className="w-full py-3.5 rounded-xl font-bold text-cream bg-primary hover:bg-hover hover:text-hover-foreground transition-all duration-200 shadow-md"
        >
          Send Message
        </button>
      </div>
    </section>
  );
}
