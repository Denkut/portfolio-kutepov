import { useEffect, useRef, useState, useMemo } from "react";
import { Home, About, Projects, Contact } from "../sections";
import { Header } from "../components";

export const ScrollLayout = () => {
  const [activeSection, setActiveSection] = useState(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  const sectionRefs = useMemo(
    () => ["home", "about", "projects", "contact"],
    []
  );

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollTimeout.current) return;

    if (e.deltaY > 0 && activeSection < sectionRefs.length - 1) {
      setActiveSection((prev) => prev + 1);
    } else if (e.deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 800);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) < 50) return;

    if (deltaY > 0 && activeSection < sectionRefs.length - 1) {
      setActiveSection((prev) => prev + 1);
    } else if (deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }

    touchStartY.current = null;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const index = sectionRefs.indexOf(hash);
      if (index !== -1) setActiveSection(index);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sectionRefs]);

  const sectionId = sectionRefs[activeSection];
  if (window.location.hash !== `#${sectionId}`) {
    history.replaceState(null, "", `#${sectionId}`);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="z-50 fixed top-0 left-0 w-full">
        <Header />
      </div>

      <Home isActive={activeSection === 0} />
      <About isActive={activeSection === 1} wasActive={activeSection > 1} />
      <Projects isActive={activeSection === 2} wasActive={activeSection > 2} />
      <Contact isActive={activeSection === 3} />
    </div>
  );
};
