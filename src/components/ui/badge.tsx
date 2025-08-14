import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className 
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          // Variants
          'bg-amber-100 text-amber-800': variant === 'default',
          'bg-gray-100 text-gray-800': variant === 'secondary',
          'border border-gray-300 bg-transparent text-gray-700': variant === 'outline',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-0.5 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
} 