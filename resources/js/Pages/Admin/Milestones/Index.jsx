import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ milestones }) {
    return (
        <AdminLayout title="Hitos">
            <Head title="Hitos" />
            <PageHeader eyebrow="Avance" title="Hitos del ecosistema" actions={<GradientButton href={route('admin.milestones.create')}>Nuevo hito</GradientButton>} />
            <DataTable rows={milestones.data} columns={[
                { key: 'title', label: 'Título' },
                { key: 'category', label: 'Categoría' },
                { key: 'progress_percentage', label: 'Avance', render: (row) => `${row.progress_percentage}%` },
                { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                { key: 'actions', label: 'Acciones', render: (row) => <div className="flex gap-3"><Link href={route('admin.milestones.edit', row.id)} className="text-rem-blue">Editar</Link><button onClick={() => router.delete(route('admin.milestones.destroy', row.id))} className="text-red-400">Eliminar</button></div> },
            ]} />
        </AdminLayout>
    );
}
