import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function GradientButton({ href, children, className = '' }) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex items-center justify-center rounded-full bg-rem-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]',
                className
            )}
        >
            {children}
        </Link>
    );
}
