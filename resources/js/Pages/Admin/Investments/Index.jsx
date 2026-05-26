import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Index({ investments }) {
    return (
        <AdminLayout title="Inversiones">
            <Head title="Inversiones" />
            <PageHeader eyebrow="Capital" title="Inversiones" actions={<GradientButton href={route('admin.investments.create')}>Nueva inversión</GradientButton>} />
            <DataTable
                rows={investments.data}
                columns={[
                    { key: 'partner', label: 'Socio', render: (row) => row.investor_profile?.user?.name || row.investorProfile?.user?.name },
                    { key: 'amount', label: 'Monto', render: (row) => formatCurrency(row.amount) },
                    { key: 'available_amount', label: 'Disponible', render: (row) => formatCurrency(row.available_amount) },
                    { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                    {
                        key: 'actions',
                        label: 'Acciones',
                        render: (row) => (
                            <div className="flex gap-3">
                                <Link href={route('admin.investments.show', row.id)} className="text-rem-green">Ver</Link>
                                <Link href={route('admin.investments.edit', row.id)} className="text-rem-blue">Editar</Link>
                                <button onClick={() => router.delete(route('admin.investments.destroy', row.id))} className="text-red-400">Eliminar</button>
                            </div>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
