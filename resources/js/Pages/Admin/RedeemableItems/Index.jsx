import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Index({ items }) {
    return (
        <AdminLayout title="Beneficios">
            <Head title="Beneficios" />
            <PageHeader eyebrow="Catálogo" title="Ítems redimibles" actions={<GradientButton href={route('admin.redeemable-items.create')}>Nuevo ítem</GradientButton>} />
            <DataTable rows={items.data} columns={[
                { key: 'name', label: 'Nombre' },
                { key: 'type', label: 'Tipo' },
                { key: 'value', label: 'Valor', render: (row) => formatCurrency(row.value) },
                { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                { key: 'actions', label: 'Acciones', render: (row) => <div className="flex gap-3"><Link href={route('admin.redeemable-items.edit', row.id)} className="text-rem-blue">Editar</Link><button onClick={() => router.delete(route('admin.redeemable-items.destroy', row.id))} className="text-red-400">Eliminar</button></div> },
            ]} />
        </AdminLayout>
    );
}
