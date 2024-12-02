import { Theme } from "@/constants/common";
import { useTheme as nextUseTheme } from "next-themes";

export default function useTheme() {
  const { theme, setTheme } = nextUseTheme();

  const handleTheme = () => {
    setTheme(theme === Theme.light ? Theme.dark : Theme.light);
  };

  return { theme: theme || Theme.light, handleTheme };
}
