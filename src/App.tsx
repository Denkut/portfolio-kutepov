import { Footer, Header, MusicToggle, ScrollToTopButton } from "./components";
import { Home, About, Projects, Hobbies } from "./sections";
import { LanguageProvider, ThemeProvider } from "./providers";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollToTopButton />
        <div className="bg-white dark:bg-background text-black dark:text-foreground transition-colors duration-300">
          <Header />
          <main className="flex flex-col gap-40 px-6 md:px-10 lg:px-20 mt-24">
            <section id="home">
              <Home />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="hobbies">
              <Hobbies />
            </section>
          </main>
          <Footer />
          <MusicToggle />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
