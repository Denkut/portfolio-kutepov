import { motion } from "framer-motion";
import { useLanguage } from "../context";
import { translations } from "../constants";
import clsx from "clsx";
import {
  SiReact,
  SiTypescript,
  SiRedux,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";

interface AboutProps {
  isActive: boolean;
  wasActive: boolean;
}

export const About = ({ isActive, wasActive }: AboutProps) => {
  const { language } = useLanguage();
  const t = translations[language].aboutSection;
  const timeline = translations[language].timeline;
  const shouldStickLeft = wasActive && !isActive;

  if (!isActive && !wasActive) return null;

  return (
    <motion.section
      id="about"
      className={clsx(
        "w-screen h-screen flex items-center justify-center text-left transition-all duration-700 z-10 px-4 md:px-10",
        shouldStickLeft ? "absolute top-0 left-0" : "fixed top-0 left-0"
      )}
      animate={{
        opacity: isActive || wasActive ? 1 : 0,
        x: isActive ? 0 : shouldStickLeft ? -450 : -200,
        y: isActive ? 0 : shouldStickLeft ? 0 : -200,
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-4xl mx-auto space-y-8 overflow-y-auto max-h-[90vh] pb-10 no-scrollbar">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mt-5">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-muted-foreground">
            {t.description}
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary">
            Stack I Use
          </h3>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-6 items-center justify-center sm:justify-start">
            <StackItem icon={<SiReact />} label="React" />
            <StackItem icon={<SiTypescript />} label="TypeScript" />
            <StackItem icon={<SiRedux />} label="Redux" />
            <StackItem icon={<SiNodedotjs />} label="Node.js" />
            <StackItem icon={<SiMongodb />} label="MongoDB" />
            <StackItem icon={<SiTailwindcss />} label="Tailwind" />
            <StackItem icon={<SiDocker />} label="Docker" />
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-primary">
            Experience
          </h3>
          <div className="relative pl-4 border-l-2 border-muted-foreground space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -left-[10px] top-2 w-4 h-4 bg-primary rounded-full shadow-md" />
                <div className="ml-4">
                  <h4 className="text-sm sm:text-base font-semibold text-muted-foreground">
                    {item.year} — {item.title}
                  </h4>
                  <p className="text-sm italic text-muted-foreground mb-1">
                    {item.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const StackItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition">
    <div className="text-3xl sm:text-4xl">{icon}</div>
    <span className="mt-2">{label}</span>
  </div>
);
