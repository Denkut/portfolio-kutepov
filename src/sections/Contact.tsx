import { motion } from "framer-motion";
import { useLanguage } from "../context";
import { translations } from "../constants";
import { FaGithub, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";

export const Contact = ({ isActive }: { isActive: boolean }) => {
  const { language } = useLanguage();
  const t = translations[language].contactSection;

  return (
    <motion.section
      id="contact"
      className="fixed inset-0 flex items-center justify-center text-center z-30 pointer-events-none"
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative bg-white/90 dark:bg-zinc-900/80 rounded-xl sm:rounded-2xl p-6 sm:p-10 shadow-2xl max-w-md sm:max-w-lg w-full pointer-events-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: -10 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Let's connect
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
          {t.description}
        </p>

        <a
          href={`mailto:${t.email}`}
          className="block text-primary font-medium underline hover:opacity-80 transition mb-6 text-sm sm:text-base"
        >
          {t.email}
        </a>

        <div className="flex justify-center gap-5 mb-6">
          <a
            href="https://github.com/Denkut"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-110"
          >
            <FaGithub className="text-2xl sm:text-3xl text-primary" />
          </a>
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-110"
          >
            <FaTelegramPlane className="text-2xl sm:text-3xl text-primary" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-110"
          >
            <FaLinkedin className="text-2xl sm:text-3xl text-primary" />
          </a>
        </div>

        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm sm:text-base bg-primary text-white dark:text-black font-semibold rounded-full shadow-md hover:bg-opacity-90 transition"
        >
          <HiOutlineDownload className="text-lg" />
          {language === "ru" ? "Скачать резюме" : "Download Resume"}
        </a>
      </motion.div>
    </motion.section>
  );
};
