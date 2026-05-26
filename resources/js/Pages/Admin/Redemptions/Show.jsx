import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import TextareaInput from '@/Components/TextareaInput';
import InputLabel from '@/Components/InputLabel';
import { formatCurrency } from '@/lib/utils';

export default function Show({ redemption }) {
    const { data, setData } = useForm({ admin_notes: redemption.admin_notes || '' });
    const send = (name) => router.patch(route(name, redemption.id), data);
    return (
        <AdminLayout title="Gestionar redención">
            <Head title="Gestionar redención" />
            <PageHeader eyebrow="Revisión" title={formatCurrency(redemption.requested_amount)} />
            <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="p-6 lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                        <div><p className="text-white/45">Socio</p><p>{redemption.investor_profile?.user?.name || redemption.investorProfile?.user?.name}</p></div>
                        <div><p className="text-white/45">Tipo</p><p>{redemption.redemption_type}</p></div>
                        <div><p className="text-white/45">Estado</p><p>{redemption.status}</p></div>
                        <div><p className="text-white/45">Fecha</p><p>{redemption.requested_at}</p></div>
                    </div>
                    <div className="mt-6">
                        <InputLabel value="Notas administrativas" />
                        <TextareaInput className="mt-1 min-h-28" value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} />
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="grid gap-3">
                        <button onClick={() => send('admin.redemptions.under-review')} className="rounded-xl bg-rem-blue px-4 py-3 text-sm font-semibold text-white">Marcar en revisión</button>
                        <button onClick={() => send('admin.redemptions.approve')} className="rounded-xl bg-rem-green px-4 py-3 text-sm font-semibold text-rem-background">Aprobar</button>
                        <button onClick={() => send('admin.redemptions.complete')} className="rounded-xl border border-rem-green/40 px-4 py-3 text-sm font-semibold text-rem-green">Completar</button>
                        <button onClick={() => send('admin.redemptions.reject')} className="rounded-xl border border-red-400/40 px-4 py-3 text-sm font-semibold text-red-300">Rechazar</button>
                        <button onClick={() => send('admin.redemptions.cancel')} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/70">Cancelar</button>
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
