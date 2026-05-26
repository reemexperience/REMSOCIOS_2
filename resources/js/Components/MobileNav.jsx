import { Link } from '@inertiajs/react';
import { FileText, LayoutDashboard, Sparkles } from 'lucide-react';

const items = [
    { label: 'Inicio', href: 'dashboard', icon: LayoutDashboard },
    { label: 'Reportes', href: 'partner.reports.index', icon: FileText },
    { label: 'Beneficios', href: 'partner.redeemable-items.index', icon: Sparkles },
];

export default function MobileNav() {
    return (
        <nav className="fixed bottom-4 left-4 right-4 z-40 rounded-3xl border border-white/10 bg-rem-dark/95 p-3 shadow-soft backdrop-blur-xl lg:hidden">
            <div className="grid grid-cols-3 gap-2">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={route(item.href)}
                            className="flex flex-col items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-white/70"
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
