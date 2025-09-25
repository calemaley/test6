import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("cookies:consent");
    if (!v) setVisible(true);
  }, []);

  const choose = (val: "accepted" | "denied") => {
    localStorage.setItem("cookies:consent", val);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] px-4">
      <div className="mx-auto max-w-3xl rounded-xl border bg-white/90 backdrop-blur p-4 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-foreground/80">
            We use cookies to enhance your experience. You can accept or deny
            non-essential cookies.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => choose("denied")}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Deny
            </button>
            <button
              onClick={() => choose("accepted")}
              className="btn-primary text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
