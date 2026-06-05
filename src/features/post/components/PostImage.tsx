"use client";

import { useState } from "react";
import Image from "next/image";

interface PostImageProps {
  image: string;
  alt: string;
  priority?: boolean;
}

export default function PostImage({ image, alt, priority = false }: PostImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
      {!imageError ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <span className="text-white text-sm">تصویر پست</span>
        </div>
      )}
    </div>
  );
}