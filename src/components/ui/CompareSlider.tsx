import { useState } from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider';

interface MetamorphosisItem {
  id: string;
  name: string;
  age: number;
  quote: string;
  result: string;
  beforeImage: string;
  afterImage: string;
}

interface Props {
  items: MetamorphosisItem[];
}

export default function CompareSlider({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="aspect-[4/3] relative">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={currentItem.beforeImage}
                alt={`${currentItem.name} - przed`}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={currentItem.afterImage}
                alt={`${currentItem.name} - po`}
              />
            }
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            Przed
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            Po
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[var(--color-text-dark)]">
              {currentItem.name}, {currentItem.age} lat
            </h3>
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[var(--color-secondary)] w-8'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Przejdź do metamorfozy ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <blockquote className="text-lg italic text-[var(--color-text-light)] mb-4 border-l-4 border-[var(--color-secondary)] pl-4">
            "{currentItem.quote}"
          </blockquote>

          <div className="bg-[var(--color-background-alt)] rounded-lg p-4">
            <p className="text-[var(--color-text-dark)] font-medium">
              {currentItem.result}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="bg-[var(--color-secondary)] text-white p-3 rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors shadow-lg"
          aria-label="Poprzednia metamorfoza"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="bg-[var(--color-secondary)] text-white p-3 rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors shadow-lg"
          aria-label="Następna metamorfoza"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
