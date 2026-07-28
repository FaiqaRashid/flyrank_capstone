import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Creative Studio",
  description: "Portfolio built with Next.js, TypeScript, and custom Tailwind CSS palette.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        {/* Responsive Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground border-t border-maroon/20 mt-12 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
            <p>© {new Date().getFullYear()} Portfolio. Custom Palette (Maroon, Brown, Ochre, Gold, Cream).</p>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-maroon shadow-sm" title="Maroon (#800000)"></span>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-brown shadow-sm" title="Brown (#633A2C)"></span>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-ochre shadow-sm" title="Ochre (#B88A2C)"></span>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-gold shadow-sm" title="Gold (#B8860B)"></span>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-cream border border-brown/40 shadow-sm" title="Cream (#E0D6B8)"></span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
