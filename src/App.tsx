import { ThemeProvider } from "./providers/ThemeProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import { ScrollLayout } from "./layouts";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-background text-black dark:text-foreground transition-colors duration-300">
          <ScrollLayout />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
