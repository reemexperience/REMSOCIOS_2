import { Head } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Show({ redemption }) {
    return (
        <PartnerLayout title="Detalle de redención">
            <Head title="Detalle de redención" />
            <PageHeader eyebrow="Solicitud" title={formatCurrency(redemption.requested_amount)} badge={redemption.status} />
            <GlassCard className="p-6">
                <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                    <div><p className="text-white/45">Tipo</p><p>{redemption.redemption_type}</p></div>
                    <div><p className="text-white/45">Fecha</p><p>{redemption.requested_at}</p></div>
                    <div><p className="text-white/45">Notas socio</p><p>{redemption.partner_notes}</p></div>
                    <div><p className="text-white/45">Notas admin</p><p>{redemption.admin_notes}</p></div>
                </div>
            </GlassCard>
        </PartnerLayout>
    );
}
