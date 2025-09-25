import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const d = localStorage.getItem("theme:dark") === "1";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme:dark", next ? "1" : "0");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full border bg-gradient-to-br from-primary to-emerald-500 text-white px-4 py-2 shadow-lg transition hover:scale-[1.03]"
    >
      <Palette className="h-4 w-4" />
      <span className="text-sm">Theme</span>
    </button>
  );
}
