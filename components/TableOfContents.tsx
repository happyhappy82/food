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
    <nav className="hidden xl:block fixed top-24 right-8 w-48 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-sm font-bold mb-3 text-gray-700">목차</h2>
        <ul className="space-y-1.5">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-xs text-gray-600 hover:text-blue-600 block truncate"
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
