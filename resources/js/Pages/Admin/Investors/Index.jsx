import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import GradientButton from '@/Components/GradientButton';
import PageHeader from '@/Components/PageHeader';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ investors }) {
    return (
        <AdminLayout title="Socios">
            <Head title="Socios" />

            <PageHeader
                eyebrow="Gestión de socios"
                title="Socios y aliados"
                description="Administra perfiles, estados y trazabilidad básica de los aliados fundadores."
                actions={
                    <>
                        <Link
                            href={route('admin.investor-invitations.index')}
                            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-rem-green/50 hover:text-white"
                        >
                            Invitaciones públicas
                        </Link>
                        <GradientButton href={route('admin.investors.create')}>Nuevo socio</GradientButton>
                    </>
                }
            />

            <DataTable
                rows={investors.data}
                columns={[
                    {
                        key: 'name',
                        label: 'Socio',
                        render: (row) => (
                            <div>
                                <p className="font-semibold text-white">{row.user?.name}</p>
                                <p className="text-xs text-white/50">{row.user?.email}</p>
                            </div>
                        ),
                    },
                    { key: 'investor_type', label: 'Tipo', render: (row) => <StatusBadge value={row.investor_type} /> },
                    { key: 'status', label: 'Estado', render: (row) => <StatusBadge value={row.status} /> },
                    { key: 'city', label: 'Ciudad' },
                    {
                        key: 'actions',
                        label: 'Acciones',
                        render: (row) => (
                            <div className="flex gap-3">
                                <Link href={route('admin.investors.show', row.id)} className="text-rem-green">
                                    Ver
                                </Link>
                                <Link href={route('admin.investors.edit', row.id)} className="text-rem-blue">
                                    Editar
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => router.delete(route('admin.investors.destroy', row.id))}
                                    className="text-red-400"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
