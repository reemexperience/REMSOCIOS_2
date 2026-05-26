import { Link, usePage } from '@inertiajs/react';
import { Bell, LogOut } from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';

export default function Topbar({ title }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const profile = user?.investor_profile;

    return (
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                    {profile?.investor_type && <StatusBadge value={profile.investor_type} />}
                    {profile?.status && <StatusBadge value={profile.status} />}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-rem-dark text-white/70">
                    <Bell size={18} />
                </button>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white/75 transition hover:text-white"
                >
                    <LogOut size={16} />
                    Salir
                </Link>
            </div>
        </div>
    );
}
