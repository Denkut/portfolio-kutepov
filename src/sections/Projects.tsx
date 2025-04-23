import { useLanguage } from "../context";
import { translations } from "../constants";
import { motion } from "framer-motion";

export const Projects = () => {
  const { language } = useLanguage();
  const { title, items } = translations[language].projectsSection;

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-muted-foreground/20 dark:border-muted-foreground/10 p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-zinc-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:underline">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {project.description[language]}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted px-2 py-1 rounded-full dark:bg-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
