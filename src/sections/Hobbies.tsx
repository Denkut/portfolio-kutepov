import { motion } from "framer-motion";
import { useLanguage } from "../context";
import { translations } from "../constants";
// import musicCover from "../../public/covers/melancholy.jpg";
import { AudioPlayer } from "../components";

export const Hobbies = () => {
  const { language } = useLanguage();
  const t = translations[language].hobbiesSection;

  return (
    <section
      id="hobbies"
      className="py-20 md:py-32 bg-zinc-100 dark:bg-zinc-900 text-center"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.description}
        </motion.p>

        <motion.a
          href="https://audiojungle.net/user/denkutm/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary text-white dark:text-black font-medium rounded-full hover:bg-opacity-90 transition"
          whileHover={{ scale: 1.05 }}
        >
          {t.cta}
        </motion.a>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AudioPlayer />
        </motion.div>
      </div>
    </section>
  );
};
