import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="border-b p-3 flex justify-end">
      <Button variant="outline" onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </Button>
    </header>
  );
}
