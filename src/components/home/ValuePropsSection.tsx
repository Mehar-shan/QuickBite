import React from 'react';
import { Bike, Leaf, Flame, Tag, Smile } from 'lucide-react';
import { VALUE_PROPS } from '../../data/mockData';

export const ValuePropsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bike':
        return <Bike className="w-6 h-6 text-amber-500" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Tag':
        return <Tag className="w-6 h-6 text-amber-500" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-amber-500" />;
      default:
        return <Flame className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="relative w-full z-20 -mt-8 sm:-mt-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/20 border border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-neutral-100">
            {VALUE_PROPS.map((prop, idx) => (
              <div
                key={prop.id}
                className={`flex flex-col items-center text-center space-y-2.5 ${
                  idx > 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''
                }`}
              >
                {/* Icon Container with subtle circle */}
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200/60 shadow-inner">
                  {getIcon(prop.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-900 font-display">
                  {prop.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed max-w-[200px]">
                  {prop.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
