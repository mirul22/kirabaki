import type { ReactNode } from "react";
import Link from "next/link";

const tabs = [
  { href: "/home", label: "Journey" },
  { href: "/money", label: "Money" },
  { href: "/find", label: "Find" },
  { href: "/learn", label: "Learn" },
  { href: "/you", label: "You" },
] as const;

export function AppChrome({
  current,
  children,
}: {
  current: (typeof tabs)[number]["href"];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-24 pt-6">
      {children}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-white/5 bg-kb-night"
        aria-label="KIRABAKI"
      >
        <ul className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          {tabs.map((tab) => {
            const active = tab.href === current;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm font-semibold ${
                    active ? "text-kb-seal" : "text-[#f7efe4]/55"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
