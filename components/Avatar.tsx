import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  alt: string;
  name: string;
  size?: AvatarSize;
  className?: string;
  priority?: boolean;
  variant?: 'circle' | 'rounded';
}

const sizeMap: Record<AvatarSize, { container: string; text: string; imgSize: number }> = {
  sm: { container: 'w-10 h-10', text: 'text-sm', imgSize: 40 },
  md: { container: 'w-16 h-16', text: 'text-xl', imgSize: 64 },
  lg: { container: 'w-24 h-24', text: 'text-3xl', imgSize: 96 },
  xl: { container: 'w-40 h-40', text: 'text-5xl', imgSize: 160 },
};

const bgGradients = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
];

const variantRadii: Record<'circle' | 'rounded', string> = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

function getGradient(name: string): string {
  return bgGradients[name.length % bgGradients.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getSizes(size: AvatarSize): string {
  const px = sizeMap[size].imgSize;
  return `(max-width: 640px) ${px}px, ${px}px`;
}

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className = '',
  priority = false,
  variant = 'rounded',
}: AvatarProps) {
  const { container: containerSize, text: textSize } = sizeMap[size];
  const radius = variantRadii[variant];
  const initials = getInitials(name);
  const gradient = getGradient(name);

  return (
    <div
      className={`relative shrink-0 ${containerSize} ${radius} ${className}`}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={getSizes(size)}
          className={`object-cover ${radius}`}
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ${textSize} ${radius}`}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}
    </div>
  );
}
