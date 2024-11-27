import { Theme } from "@/constants/common";
import { useTheme as nextUseTheme } from "next-themes";

export default function useTheme() {
  const { theme, setTheme } = nextUseTheme();

  const handleTheme = () => {
    console.log(111);
    setTheme(theme === Theme.light ? Theme.dark : Theme.light);
  };

  return { theme: theme || Theme.light, handleTheme };
}
