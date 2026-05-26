import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import PageHeader from '@/Components/PageHeader';

export default function Index({ permissions }) {
    const columns = [
        { key: 'name', label: 'Permiso' },
        { key: 'roles_count', label: 'Roles que lo usan' },
        {
            key: 'actions',
            label: 'Acciones',
            render: (permission) => (
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href={route('admin.settings.permissions.edit', permission.id)} className="text-rem-blue">Editar</Link>
                    <button type="button" onClick={() => router.delete(route('admin.settings.permissions.destroy', permission.id))} className="text-red-400">Eliminar</button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Permisos">
            <Head title="Permisos" />
            <PageHeader
                eyebrow="Configuración"
                title="Permisos del sistema"
                description="Gestiona las capacidades granulares que luego se asignan a cada rol administrativo o de socios."
                actions={[
                    <Link key="create" href={route('admin.settings.permissions.create')} className="rounded-full bg-rem-blue px-5 py-3 text-sm font-semibold text-white">
                        Crear permiso
                    </Link>,
                ]}
            />
            <DataTable columns={columns} rows={permissions.data} empty="Aún no hay permisos disponibles." />
        </AdminLayout>
    );
}
