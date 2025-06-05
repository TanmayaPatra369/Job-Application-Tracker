import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const handleError = () => {
    setImgError(true);
  };

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const getFallbackInitials = () => {
    if (!fallback || typeof fallback !== 'string') {
      return 'U';
    }
    return fallback
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center overflow-hidden',
        sizes[size],
        className
      )}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || fallback}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;