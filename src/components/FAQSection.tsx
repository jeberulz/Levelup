'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does the free plan work?",
    answer: "Free includes core lessons, daily streaks, and basic quests. No credit card required, cancel anytime."
  },
  {
    question: "Can I cancel or switch plans anytime?",
    answer: "Yes. Manage your plan in settings. No long-term contracts and no hidden fees."
  },
  {
    question: "What about my data and privacy?",
    answer: "We never sell your data. We use encryption and follow strict security practices. You control what's shared."
  },
  {
    question: "Do you partner with campuses or clubs?",
    answer: "Yes. We offer campus licenses with LMS integration, plus verified club leaderboards and onboarding support."
  },
  {
    question: "Do you earn from affiliate links or offers?",
    answer: "Sometimes. We clearly label partner offers and only include options we'd recommend to our own friends."
  },
  {
    question: "Who is LevelUp Money for?",
    answer: "Students, grads, and young pros who want a simple, fun way to master budgeting, investing, and credit."
  },
  {
    question: "What's your refund policy?",
    answer: "Premium has a 30-day money-back guarantee. Just contact support and we'll handle it quickly."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="lg:px-8 sm:px-8 pt-10 pb-20" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-center">Questions, answered</h2>
        <p className="text-neutral-700 text-base sm:text-lg mt-3 text-center leading-relaxed">Everything you need to know about trials, privacy, and plans.</p>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => (
            <details 
              key={i} 
              className="group bg-white ring-1 ring-neutral-200 rounded-2xl p-5 open:ring-neutral-300"
              open={openIndex === i}
              onClick={(e) => {
                e.preventDefault();
                setOpenIndex(openIndex === i ? null : i);
              }}
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-neutral-900 list-none">
                {faq.question}
                <span className={`ml-3 text-neutral-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              {openIndex === i && (
                <p className="text-neutral-700 mt-3 text-sm">{faq.answer}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
