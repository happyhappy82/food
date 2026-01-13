"use client";

import { useState } from "react";

interface QnAItem {
  question: string;
  answer: string;
}

interface QnAProps {
  items: QnAItem[];
}

export default function QnA({ items }: QnAProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
      <div className="space-y-4" role="list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;

          return (
            <div key={index} className="border rounded-lg" role="listitem">
              <button
                id={questionId}
                className="w-full text-left p-4 font-semibold hover:bg-gray-50 flex justify-between items-center"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span>{item.question}</span>
                <span className="text-2xl" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                className={isOpen ? "p-4 pt-0 text-gray-700 whitespace-pre-wrap" : ""}
              >
                {isOpen && item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
