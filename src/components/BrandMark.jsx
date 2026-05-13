import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';

export default function BrandMark({ to = '/', className, subtitle, ...props }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-3', className)} {...props}>
      <div className="h-10 w-10 rounded-lg border border-line bg-white shadow-[0_1px_0_rgba(17,24,39,0.06)] grid place-items-center">
        <span className="font-serif text-lg text-brand-700">R</span>
      </div>
      <div className="leading-tight">
        <div className="font-serif text-lg text-ink">RecollectAI</div>
        {subtitle ? (
          <div className="text-xs text-ink-muted tracking-tight">{subtitle}</div>
        ) : null}
      </div>
    </Link>
  );
}
