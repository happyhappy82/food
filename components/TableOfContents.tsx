"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("article h2");
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      const text = heading.textContent || "";

      if (id && text) {
        items.push({ id, text });
      }
    });

    setToc(items);
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-base font-bold mb-4 text-gray-800">목차</h2>
        <ul className="space-y-2.5">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-gray-600 hover:text-blue-600 block"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
