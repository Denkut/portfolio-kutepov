import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "../components";
import { translations } from "../constants";
import { useLanguage } from "../context";
import { ProjectsProps } from "../types";
import clsx from "clsx";

export const Projects = ({ isActive, wasActive }: ProjectsProps) => {
  const { language } = useLanguage();
  const { title, items } = translations[language].projectsSection;
  const [isSettled, setIsSettled] = useState(false);
  const [wasSticky, setWasSticky] = useState(false);
  const shouldStickRight = wasSticky && !isActive;
  const scrollRef = useRef<HTMLDivElement>(null);
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += 300;
  };

  useEffect(() => {
    if (!shouldStickRight || !verticalScrollRef.current) return;

    const container = verticalScrollRef.current;
    const scrollSpeed = 1;
    const interval = setInterval(() => {
      if (!autoScroll) return;

      container.scrollBy({ top: scrollSpeed, behavior: "smooth" });

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
      ) {
        container.scrollTop = container.scrollHeight / 3;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [shouldStickRight, autoScroll]);

  const extendedItems = [...items, ...items, ...items];

  useEffect(() => {
    if (verticalScrollRef.current) {
      verticalScrollRef.current.scrollTop =
        verticalScrollRef.current.scrollHeight / 3;
    }
  }, [shouldStickRight]);

  useEffect(() => {
    if (isActive) {
      setWasSticky(false);
    } else if (wasActive) {
      setWasSticky(true);
    }
  }, [isActive, wasActive]);

  const handleWheel = (e: React.WheelEvent) => {
    if (shouldStickRight) {
      e.stopPropagation();
    }
  };

  return (
    <motion.section
      id="projects"
      className={clsx(
        "w-screen h-screen flex items-center justify-center px-0 text-center transition-all duration-700 z-20 ",
        isActive || wasActive ? "block" : "hidden",
        shouldStickRight ? "absolute top-0 right-0" : "fixed top-0 right-0 z-10"
      )}
      onAnimationComplete={() => {
        setIsSettled(shouldStickRight);
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive || wasActive ? 1 : 0,
        scale: isActive ? 1 : 0.9,
        x: shouldStickRight ? 700 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {isActive && (
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/10 via-white/10 to-primary/10 backdrop-blur-md pointer-events-none" />
      )}
      <div className="max-w-6xl w-full z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary z-10">
          {title}
        </h2>
        {!shouldStickRight ? (
          <div className="relative overflow-hidden">
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-xl transition hover:scale-110 hover:bg-primary/80 text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth pr-4"
              style={{ maxWidth: "100%" }}
            >
              {items.map((project) => (
                <div className="flex-shrink-0 w-full sm:w-[30%]">
                  <ProjectCard
                    key={project.id}
                    name={project.name}
                    description={project.description[language]}
                    tech={[...project.tech]}
                    link={project.link}
                    compact={false}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-xl transition hover:scale-110 hover:bg-primary/80 text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            key={shouldStickRight ? "vertical" : "horizontal"}
            ref={verticalScrollRef}
            onWheel={handleWheel}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
            className={clsx(
              "flex flex-col gap-6 items-center max-h-[70vh] px-2 pr-3 no-scrollbar",
              isSettled ? "overflow-y-auto" : "overflow-hidden"
            )}
          >
            {extendedItems.map((project, index) => (
              <ProjectCard
                key={project.id + "-loop-" + index}
                name={project.name}
                description={project.description[language]}
                tech={[...project.tech]}
                link={project.link}
                compact={true}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};
