import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Show({ investor }) {
    return (
        <AdminLayout title="Detalle del socio">
            <Head title="Detalle del socio" />
            <PageHeader eyebrow="Perfil" title={investor.user?.name} badge={investor.status} actions={<Link href={route('admin.investors.edit', investor.id)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Editar</Link>} />
            <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="p-6 lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                        <div><p className="text-white/45">Correo</p><p>{investor.user?.email}</p></div>
                        <div><p className="text-white/45">Tipo</p><StatusBadge value={investor.investor_type} /></div>
                        <div><p className="text-white/45">Documento</p><p>{investor.document_type} {investor.document_number}</p></div>
                        <div><p className="text-white/45">Ubicación</p><p>{investor.city}, {investor.country}</p></div>
                        <div><p className="text-white/45">Teléfono</p><p>{investor.phone}</p></div>
                        <div><p className="text-white/45">Ingreso</p><p>{investor.joined_at}</p></div>
                    </div>
                    <div className="mt-6"><p className="text-white/45">Notas</p><p className="mt-2 text-white/70">{investor.notes || 'Sin notas.'}</p></div>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm text-white/45">Inversiones</p>
                    <div className="mt-4 space-y-3">
                        {investor.investments?.map((investment) => (
                            <div key={investment.id} className="rounded-2xl border border-white/10 p-4">
                                <p className="font-semibold text-white">{formatCurrency(investment.amount)}</p>
                                <p className="text-xs text-white/50">{investment.status}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
