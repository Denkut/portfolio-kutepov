import { useState } from "react";
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useTheme, useLanguage } from "../context";
import { translations } from "../constants";
import avatar from "../assets/avatar.jpg";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const translation = translations[language];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-background shadow-md text-black dark:text-foreground px-4 py-3 flex justify-between items-center">
      <a
        href="#home"
        className="flex items-center gap-3 text-lg font-bold text-primary"
      >
        <img
          src={avatar}
          alt="Denis Kutepov"
          className="w-10 h-10 rounded-full border border-primary object-cover"
        />
        <span className="hidden sm:inline">Denis Kutepov</span>
      </a>

      <nav className="hidden md:flex items-center gap-6">
        <a href="#home" className="hover:text-primary transition">
          Home
        </a>
        <a href="#about" className="hover:text-primary transition">
          {translation.about}
        </a>
        <a href="#projects" className="hover:text-primary transition">
          {translation.projects}
        </a>
        <a href="#contact" className="hover:text-primary transition">
          {translation.contact}
        </a>

        <button onClick={toggleTheme} className="text-xl hover:text-primary">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        <button
          onClick={toggleLanguage}
          className="text-xl flex items-center gap-1 hover:text-primary"
        >
          <FaGlobe /> <span className="text-sm uppercase">{language}</span>
        </button>
      </nav>

      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className="text-xl hover:text-primary">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={toggleLanguage} className="text-xl hover:text-primary">
          <FaGlobe />
        </button>
        <button
          className="text-2xl text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-background shadow-md py-6 px-4 flex flex-col items-center gap-4 md:hidden animate-fade-in-down z-40">
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {translation.about}
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            {translation.projects}
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {translation.contact}
          </a>
        </div>
      )}
    </header>
  );
};
