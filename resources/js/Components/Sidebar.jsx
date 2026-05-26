import { Link, usePage } from '@inertiajs/react';
import {
    BadgeDollarSign,
    BarChart3,
    FileText,
    FolderLock,
    KeyRound,
    LayoutDashboard,
    Link2,
    Milestone,
    Sparkles,
    ShieldCheck,
    TimerReset,
    Users,
    Wallet,
} from 'lucide-react';
import AppLogo from '@/Components/AppLogo';
import { cn } from '@/lib/utils';

const partnerItems = [
    { label: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
    { label: 'Mi aporte', href: 'partner.investment.show', icon: Wallet },
    { label: 'Redenciones', href: 'partner.redemptions.index', icon: BarChart3 },
    { label: 'Reportes', href: 'partner.reports.index', icon: FileText },
    { label: 'Beneficios', href: 'partner.redeemable-items.index', icon: Sparkles },
];

const adminItems = [
    { label: 'Dashboard', href: 'admin.dashboard', icon: LayoutDashboard },
    { label: 'Socios', href: 'admin.investors.index', icon: Users, permission: 'manage investors' },
    { label: 'Invitaciones', href: 'admin.investor-invitations.index', icon: Link2, permission: 'manage investors' },
    { label: 'Inversiones', href: 'admin.investments.index', icon: Wallet, permission: 'manage investments' },
    { label: 'Redenciones', href: 'admin.redemptions.index', icon: BadgeDollarSign, permission: 'manage redemptions' },
    { label: 'Reportes', href: 'admin.reports.index', icon: FileText, permission: 'manage reports' },
    { label: 'Documentos', href: 'admin.documents.index', icon: FolderLock, permission: 'manage documents' },
    { label: 'Hitos', href: 'admin.milestones.index', icon: Milestone, permission: 'manage milestones' },
    { label: 'Beneficios', href: 'admin.redeemable-items.index', icon: Sparkles, permission: 'manage redeemable items' },
    { label: 'Capital', href: 'admin.capital-allocations.index', icon: BarChart3, permission: 'manage capital allocations' },
    { label: 'Usuarios', href: 'admin.settings.users.index', icon: Users, superAdmin: true },
    { label: 'Roles', href: 'admin.settings.roles.index', icon: ShieldCheck, superAdmin: true },
    { label: 'Permisos', href: 'admin.settings.permissions.index', icon: KeyRound, superAdmin: true },
    { label: 'Ajustes invitación', href: 'admin.settings.invitation-settings.edit', icon: TimerReset, superAdmin: true },
];

export default function Sidebar({ variant = 'partner' }) {
    const { auth } = usePage().props;
    const roles = auth.roles ?? [];
    const permissions = auth.permissions ?? [];
    const isSuperAdmin = roles.includes('Super Admin');
    const items = (variant === 'admin' ? adminItems : partnerItems).filter(
        (item) =>
            variant !== 'admin' ||
            (item.superAdmin ? isSuperAdmin : !item.permission || isSuperAdmin || permissions.includes(item.permission))
    );

    return (
        <aside className="sticky top-5 hidden h-[90vh] w-72 shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-rem-dark/80 p-5 shadow-soft backdrop-blur-xl lg:flex">
            <div className="shrink-0">
                <AppLogo />
            </div>
            <div className="mt-10 flex-1 space-y-2 overflow-y-auto pr-1">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = route().current(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={route(item.href)}
                            className={cn(
                                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/65 transition',
                                active ? 'bg-rem-blue text-white shadow-glow' : 'hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
