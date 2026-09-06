import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 px-4 sm:px-8 text-neutral-900">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title matching reference layout */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-black tracking-widest uppercase text-amber-600">
              Real Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-display">
              WHAT OUR CUSTOMERS SAY
            </h2>
          </div>

          {/* Navigation Arrows matching reference */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-sm"
              title="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-sm"
              title="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-white rounded-2xl p-6 shadow-md border border-neutral-200 flex flex-col justify-between space-y-4 text-left transition-all ${
                idx === activeIndex ? 'ring-2 ring-amber-500 shadow-xl' : ''
              }`}
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">— {t.name}</h4>
                  <p className="text-[11px] text-neutral-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
