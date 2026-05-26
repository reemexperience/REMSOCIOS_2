import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ reports }) {
    return (
        <AdminLayout title="Reportes">
            <Head title="Reportes" />
            <PageHeader eyebrow="Transparencia" title="Reportes" actions={<GradientButton href={route('admin.reports.create')}>Nuevo reporte</GradientButton>} />
            <DataTable
                rows={reports.data}
                columns={[
                    { key: 'title', label: 'Título' },
                    { key: 'type', label: 'Tipo' },
                    { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                    { key: 'visibility', label: 'Visibilidad' },
                    { key: 'actions', label: 'Acciones', render: (row) => <div className="flex gap-3"><Link href={route('admin.reports.show', row.id)} className="text-rem-green">Ver</Link><Link href={route('admin.reports.edit', row.id)} className="text-rem-blue">Editar</Link><button onClick={() => router.delete(route('admin.reports.destroy', row.id))} className="text-red-400">Eliminar</button></div> },
                ]}
            />
        </AdminLayout>
    );
}
