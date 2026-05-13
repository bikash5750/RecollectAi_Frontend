import { cn } from '../../lib/cn';

export default function Card({ className, ...props }) {
  return <div className={cn('card', className)} {...props} />;
}

