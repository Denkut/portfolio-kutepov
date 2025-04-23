import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.5,
        pointerEvents: show ? "auto" : "none",
      }}
      transition={{ duration: 0.4 }}
      onClick={scrollToTop}
      whileHover={{ y: -4, rotate: -10 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-xl hover:shadow-2xl transition-transform"
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </motion.button>
  );
};
