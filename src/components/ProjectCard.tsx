import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ProjectCardProps } from "../types";
import clsx from "clsx";

interface Props extends ProjectCardProps {
  compact?: boolean;
}

export const ProjectCard: React.FC<Props> = ({
  name,
  description,
  tech,
  link,
  compact = false,
}) => {
  return (
    <motion.div
      className={clsx(
        "bg-white dark:bg-zinc-800 rounded-xl shadow-md flex flex-col justify-between transition-all duration-300 w-full",
        compact
          ? "max-w-[300px] min-h-[280px] scale-95 hover:scale-100"
          : "min-h-[360px] md:min-h-[400px] hover:scale-105",
        "hover:shadow-xl p-6 cursor-pointer"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-xl font-bold text-primary mb-2">{name}</h3>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-primary">
          {tech.map((item, idx) => (
            <span
              key={idx}
              className="bg-primary/10 px-2 py-1 rounded-full border border-primary/20"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1 hover:underline text-sm"
        >
          View project <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </motion.div>
  );
};
