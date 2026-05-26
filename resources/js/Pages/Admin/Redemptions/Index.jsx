import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Index({ redemptions }) {
    return (
        <AdminLayout title="Redenciones">
            <Head title="Redenciones" />
            <PageHeader eyebrow="Flujo de redención" title="Solicitudes de redención" />
            <DataTable
                rows={redemptions.data}
                columns={[
                    { key: 'partner', label: 'Socio', render: (row) => row.investor_profile?.user?.name || row.investorProfile?.user?.name },
                    { key: 'requested_amount', label: 'Monto', render: (row) => formatCurrency(row.requested_amount) },
                    { key: 'redemption_type', label: 'Tipo' },
                    { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                    { key: 'actions', label: 'Acciones', render: (row) => <Link href={route('admin.redemptions.show', row.id)} className="text-rem-green">Gestionar</Link> },
                ]}
            />
        </AdminLayout>
    );
}
