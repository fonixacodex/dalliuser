"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Slide {
  image: string;
  text: string;
}

const slides: Slide[] = [
  {
    image: "/images/1.webp",
    text: "لحظات روزمره را با دوستان نزدیک خود به اشتراک بگذارید",
  },
  {
    image: "/images/2.webp",
    text: "ویدیوهای کوتاه و سرگرم‌کننده را تماشا کنید",
  },
  {
    image: "/images/3.webp",
    text: "با افراد سراسر جهان در ارتباط باشید",
  },
];

export default function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden h-150 bg-linear-to-br from-purple-600 to-pink-600 shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            currentSlide === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.text}
            className="w-full h-full object-cover"
            width={500} height={500} 

          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-0 right-0 text-center px-8">
            <p className="text-white text-base font-medium max-w-xs mx-auto leading-relaxed">
              {slide.text}
            </p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-6 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}