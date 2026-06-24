import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Blog",
    template: "%s · My Blog",
  },
  description: "A statically generated blog built with Next.js + MDX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto max-w-2xl px-4 py-10">
          <header className="mb-10 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              My Blog
            </Link>
            <nav className="text-sm text-neutral-500">
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-16 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800">
            © {new Date().getFullYear()} My Blog. Built with Next.js.
          </footer>
        </div>
      </body>
    </html>
  );
}
