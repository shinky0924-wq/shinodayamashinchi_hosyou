import { useState, useEffect, memo, FC } from 'react';
import { BookOpen } from 'lucide-react';

interface ArticleCardImageProps {
  src?: string;
  alt?: string;
  categoryLabel?: string;
  category?: string;
  className?: string;
  isDetailHero?: boolean;
}

const DEFAULT_FALLBACK_IMAGE = '/images/shinodayama_high_guarantee.jpg';

export const CARD_IMAGE_VERSION = '20261030_v6_spaced_layout';

const normalizeUrl = (originalUrl?: string): string => {
  if (!originalUrl) return `${DEFAULT_FALLBACK_IMAGE}?v=${CARD_IMAGE_VERSION}`;
  let trimmed = originalUrl.trim();
  // Sanitize any legacy takishinchi or tobitashinchi path
  trimmed = trimmed.replace(/takishinchi-/g, 'shinodayamashinchi-').replace(/tobitashinchi-/g, 'shinodayamashinchi-');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  const [pathPart] = trimmed.split('?');
  const filename = pathPart.split('/').pop() || '';
  if (!filename) return `${DEFAULT_FALLBACK_IMAGE}?v=${CARD_IMAGE_VERSION}`;
  return `/images/${filename}?v=${CARD_IMAGE_VERSION}`;
};

export const ArticleCardImage: FC<ArticleCardImageProps> = memo(({
  src,
  alt = '',
  categoryLabel,
  category,
  className = '',
  isDetailHero = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => normalizeUrl(src));
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(normalizeUrl(src));
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== DEFAULT_FALLBACK_IMAGE) {
      setImgSrc(DEFAULT_FALLBACK_IMAGE);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200 flex flex-col items-center justify-center text-secondary p-4 ${className}`}>
        <BookOpen className="w-8 h-8 opacity-70 mb-1" />
        <span className="text-xs font-bold">{categoryLabel || 'お仕事コラム'}</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-rose-50 flex items-center justify-center ${className}`}>
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          !isDetailHero ? 'group-hover:scale-105' : ''
        }`}
      />
    </div>
  );
});

ArticleCardImage.displayName = 'ArticleCardImage';
