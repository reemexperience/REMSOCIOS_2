import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ documents }) {
    return (
        <AdminLayout title="Documentos">
            <Head title="Documentos" />
            <PageHeader eyebrow="Privado" title="Documentos" actions={<GradientButton href={route('admin.documents.create')}>Nuevo documento</GradientButton>} />
            <DataTable
                rows={documents.data}
                columns={[
                    { key: 'name', label: 'Nombre' },
                    { key: 'type', label: 'Tipo' },
                    { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                    { key: 'partner', label: 'Socio', render: (row) => row.investor_profile?.user?.name || row.investorProfile?.user?.name },
                    { key: 'actions', label: 'Acciones', render: (row) => <div className="flex gap-3"><Link href={route('admin.documents.show', row.id)} className="text-rem-green">Ver</Link><Link href={route('admin.documents.download', row.id)} className="text-rem-blue">Descargar</Link><button onClick={() => router.delete(route('admin.documents.destroy', row.id))} className="text-red-400">Eliminar</button></div> },
                ]}
            />
        </AdminLayout>
    );
}
