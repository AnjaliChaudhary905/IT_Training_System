import { useEffect, useState } from "react";

const images = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];

const EXTENDED_IMAGES = [...images, ...images, ...images];
const START_INDEX = images.length;

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const CENTER_WIDTH = 750; 
  const SIDE_WIDTH = 280;   
  const GAP = 24;          

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (activeIndex >= images.length * 2) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - images.length);
    }
  };

  const offset = activeIndex * (SIDE_WIDTH + GAP) + CENTER_WIDTH / 2;

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex items-center gap-6 ${
          isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(calc(50% - ${offset}px))`,
        }}
      >
        {EXTENDED_IMAGES.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`${image}-${index}`}
              className={`shrink-0 overflow-hidden rounded-2xl transition-all duration-700 ease-in-out ${
                isActive
                  ? "h-105 w-187.5 shadow-xl"
                  : "h-85 w-70 opacity-80"
              }`}
            >
              <img
                src={image}
                alt={`Hero carousel item ${(index % images.length) + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroCarousel;