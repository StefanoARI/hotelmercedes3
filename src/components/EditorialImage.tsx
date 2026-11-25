import { useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  fallbackLabel,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#07233b] via-[#0d3354] to-[#010722] text-white/85 px-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-2xl tracking-wide text-white/95">
          Hotel Mercedes
        </span>
        <span className="mt-2 text-xs tracking-wide text-[#badfff]/80">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#f1f5f9] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
