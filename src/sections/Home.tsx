import { motion } from "framer-motion";
import { useLanguage } from "../context";
import { translations } from "../constants";
import avatar from "../assets/avatar.jpg";

export const Home = ({ isActive }: { isActive: boolean }) => {
  const { language } = useLanguage();
  const t = translations[language].homeSection;

  return (
    <motion.section
      id="home"
      className="fixed w-screen h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-white via-primary/10 to-primary/5 dark:from-black dark:via-zinc-900 dark:to-zinc-800"
      animate={{
        y: isActive ? 0 : "-60vh",
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={avatar}
        alt="Denis Kutepov"
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 rounded-full border-2 border-primary shadow-lg object-cover mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="flex flex-col items-center justify-center gap-4 max-w-md sm:max-w-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t.welcome}
        </motion.h1>

        <motion.h2
          className="text-lg sm:text-2xl font-medium text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {t.role}
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-muted-foreground px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {t.description}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};
