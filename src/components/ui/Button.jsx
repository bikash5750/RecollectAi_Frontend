import { cn } from '../../lib/cn';

const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  danger: 'btn btn-danger',
  ghost: 'btn text-ink hover:bg-paper-50 border border-transparent',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: '',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? '', className)}
      {...props}
    />
  );
}

