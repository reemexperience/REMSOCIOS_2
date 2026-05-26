import { Head, Link } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ reports }) {
    return (
        <PartnerLayout title="Mis reportes">
            <Head title="Mis reportes" />
            <PageHeader eyebrow="Transparencia" title="Reportes disponibles" />
            <DataTable rows={reports.data} columns={[
                { key: 'title', label: 'Título' },
                { key: 'period', label: 'Periodo' },
                { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                { key: 'actions', label: 'Acciones', render: (row) => <Link href={route('partner.reports.show', row.id)} className="text-rem-green">Ver</Link> },
            ]} />
        </PartnerLayout>
    );
}
