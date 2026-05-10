import { useEffect, useRef, useState } from "react";
import { StarfieldCanvas } from "./components/StarfieldCanvas";
import { useThemePreference } from "./hooks/useThemePreference";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";

function App() {
  const snapContainerRef = useRef<HTMLElement | null>(null);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const { resolvedTheme, toggleTheme } = useThemePreference();

  useEffect(() => {
    setScrollElement(snapContainerRef.current);
  }, []);

  useEffect(() => {
    const scrollContainer = snapContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const revealNodes = Array.from(scrollContainer.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, root: scrollContainer },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <StarfieldCanvas scrollElement={scrollElement} />

      <main
        className="relative z-10 h-screen min-h-screen snap-y snap-proximity overflow-y-auto md:snap-mandatory"
        ref={snapContainerRef}
      >
        <HeroSection onToggleTheme={toggleTheme} resolvedTheme={resolvedTheme} />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
