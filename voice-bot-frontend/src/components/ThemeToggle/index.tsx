"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null; // Ensures the component is only rendered on the client

  return (
    <div
      className="fixed bottom-3 left-3 z-50 cursor-pointer"
      onClick={toggleTheme}
    >
      {currentTheme === "light" ? (
        <Sun className="text-stone-800" size={24} />
      ) : currentTheme === "dark" ? (
        <Moon className="text-amber-400" size={24} />
      ) : (
        <SunMoon className="text-teal-500" size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
