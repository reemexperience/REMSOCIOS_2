import { cn } from '@/lib/utils';

const variants = {
    active: 'border-rem-green/40 bg-rem-green/15 text-rem-green',
    completed: 'border-rem-blue/40 bg-rem-blue/15 text-white',
    in_progress: 'border-rem-blue/40 bg-rem-blue/15 text-white',
    pending: 'border-white/10 bg-white/5 text-white/70',
    paused: 'border-white/10 bg-rem-dark text-white/70',
    published: 'border-rem-green/40 bg-rem-green/15 text-rem-green',
    founder: 'border-rem-green/30 bg-rem-green/10 text-rem-green',
};

export default function StatusBadge({ value, className = '' }) {
    return (
        <span className={cn('inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize', variants[value] || 'border-white/10 bg-white/5 text-white/70', className)}>
            {String(value || '').replaceAll('_', ' ')}
        </span>
    );
}
