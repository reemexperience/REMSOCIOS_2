import { Head, Link } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Index({ redemptions }) {
    return (
        <PartnerLayout title="Mis redenciones">
            <Head title="Mis redenciones" />
            <PageHeader eyebrow="Solicitudes" title="Historial de redenciones" actions={<GradientButton href={route('partner.redemptions.create')}>Nueva solicitud</GradientButton>} />
            <DataTable rows={redemptions.data} columns={[
                { key: 'requested_amount', label: 'Monto', render: (row) => formatCurrency(row.requested_amount) },
                { key: 'redemption_type', label: 'Tipo' },
                { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                { key: 'actions', label: 'Acciones', render: (row) => <Link href={route('partner.redemptions.show', row.id)} className="text-rem-green">Ver</Link> },
            ]} />
        </PartnerLayout>
    );
}
