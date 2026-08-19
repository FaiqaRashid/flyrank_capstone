import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import SectionDivider from "./components/SectionDivider";

// Code-split below-the-fold components to reduce initial JS payload & main-thread execution time
const About = dynamic(() => import("./components/About"));
const Skills = dynamic(() => import("./components/Skills"));
const Projects = dynamic(() => import("./components/Projects"));
const Contact = dynamic(() => import("./components/Contact"));

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </div>
  );
}
