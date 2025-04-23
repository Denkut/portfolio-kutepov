import { motion } from "framer-motion";
import { useLanguage } from "../context";
import { translations } from "../constants";
import avatar from "../assets/avatar.jpg";

export const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].homeSection;

  return (
    <section
      id="home"
      className="w-full h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-white via-primary/10 to-primary/5 dark:from-black dark:via-zinc-900 dark:to-zinc-800"
    >
      <motion.img
        src={avatar}
        alt="Denis Kutepov"
        className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-primary shadow-lg object-cover mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-2 text-primary"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t.welcome}
      </motion.h1>

      <motion.h2
        className="text-xl md:text-3xl font-medium mb-4 text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {t.role}
      </motion.h2>

      <motion.p
        className="max-w-lg text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {t.description}
      </motion.p>

      <motion.a
        href="/resume.pdf"
        download
        className="inline-block px-6 py-2 bg-primary text-white dark:text-black font-medium rounded-full shadow-md hover:bg-opacity-90 transition"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {t.resume}
      </motion.a>
    </section>
  );
};
