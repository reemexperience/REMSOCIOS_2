import { cn } from '@/lib/utils';

export default function GlassCard({ className = '', children }) {
    return <div className={cn('glass-panel', className)}>{children}</div>;
}
