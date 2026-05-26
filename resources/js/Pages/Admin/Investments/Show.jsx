import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Show({ investment }) {
    return (
        <AdminLayout title="Detalle de inversión">
            <Head title="Detalle de inversión" />
            <PageHeader eyebrow="Capital" title={formatCurrency(investment.amount)} badge={investment.status} actions={<Link href={route('admin.investments.edit', investment.id)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Editar</Link>} />
            <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="p-6 lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                        <div><p className="text-white/45">Socio</p><p>{investment.investor_profile?.user?.name || investment.investorProfile?.user?.name}</p></div>
                        <div><p className="text-white/45">Tipo retorno</p><StatusBadge value={investment.return_type} /></div>
                        <div><p className="text-white/45">Retorno mínimo</p><p>{formatCurrency(investment.projected_min_return)}</p></div>
                        <div><p className="text-white/45">Retorno máximo</p><p>{formatCurrency(investment.projected_max_return)}</p></div>
                        <div><p className="text-white/45">Redimido</p><p>{formatCurrency(investment.redeemed_amount)}</p></div>
                        <div><p className="text-white/45">Disponible</p><p>{formatCurrency(investment.available_amount)}</p></div>
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm text-white/45">Redenciones</p>
                    <div className="mt-4 space-y-3">
                        {investment.redemption_requests?.map((redemption) => (
                            <div key={redemption.id} className="rounded-2xl border border-white/10 p-4">
                                <p className="font-semibold text-white">{formatCurrency(redemption.requested_amount)}</p>
                                <p className="text-xs text-white/50">{redemption.status}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
