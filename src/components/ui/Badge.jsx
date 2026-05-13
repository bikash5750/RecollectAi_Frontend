import { cn } from '../../lib/cn';

const TONES = {
  neutral: 'badge',
  brand: 'badge border-brand-600/30 bg-brand-50 text-brand-800',
  gold: 'badge border-accent-gold/30 bg-[color:rgb(176_141_87_/_.12)] text-[color:#6D5431]',
  sage: 'badge border-accent-sage/30 bg-[color:rgb(47_107_88_/_.12)] text-[color:#1F4B3E]',
  rose: 'badge border-accent-rose/30 bg-[color:rgb(178_100_118_/_.12)] text-[color:#6D3441]',
};

export default function Badge({ tone = 'neutral', className, ...props }) {
  return <span className={cn(TONES[tone] ?? TONES.neutral, className)} {...props} />;
}

