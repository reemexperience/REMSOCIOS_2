import { Head } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import { formatCurrency } from '@/lib/utils';

export default function MyInvestment({ profile, investment, redemptions, documents }) {
    return (
        <PartnerLayout title="Mi aporte">
            <Head title="Mi aporte" />
            <PageHeader eyebrow="Seguimiento de capital" title="Mi aporte en REM" description="Resumen consolidado de tu inversión, saldos y documentos asociados." />
            <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="p-6"><p className="text-sm text-white/45">Invertido</p><p className="mt-2 text-3xl font-bold text-white">{formatCurrency(investment?.amount)}</p></GlassCard>
                <GlassCard className="p-6"><p className="text-sm text-white/45">Disponible</p><p className="mt-2 text-3xl font-bold text-white">{formatCurrency(investment?.available_amount)}</p></GlassCard>
                <GlassCard className="p-6"><p className="text-sm text-white/45">Redimido</p><p className="mt-2 text-3xl font-bold text-white">{formatCurrency(investment?.redeemed_amount)}</p></GlassCard>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <GlassCard className="p-6"><p className="text-white/45">Redenciones</p><div className="mt-4 space-y-3">{redemptions.map((row) => <div key={row.id} className="rounded-2xl border border-white/10 p-4 text-sm text-white/70">{formatCurrency(row.requested_amount)} · {row.status}</div>)}</div></GlassCard>
                <GlassCard className="p-6"><p className="text-white/45">Documentos</p><div className="mt-4 space-y-3">{documents.map((row) => <div key={row.id} className="rounded-2xl border border-white/10 p-4 text-sm text-white/70">{row.name}</div>)}</div></GlassCard>
            </div>
        </PartnerLayout>
    );
}
