import { Theme } from "./Theme";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
