import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import PageHeader from '@/Components/PageHeader';

export default function Index({ roles }) {
    const columns = [
        { key: 'name', label: 'Rol' },
        { key: 'users_count', label: 'Usuarios' },
        { key: 'permissions_count', label: 'Permisos' },
        { key: 'permissions', label: 'Vista rápida', render: (role) => <span className="text-sm text-white/60">{role.permissions.slice(0, 3).map((permission) => permission.name).join(', ') || 'Sin permisos'}</span> },
        {
            key: 'actions',
            label: 'Acciones',
            render: (role) => (
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href={route('admin.settings.roles.show', role.id)} className="text-rem-green">Ver</Link>
                    <Link href={route('admin.settings.roles.edit', role.id)} className="text-rem-blue">Editar</Link>
                    <button type="button" onClick={() => router.delete(route('admin.settings.roles.destroy', role.id))} className="text-red-400">Eliminar</button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Roles">
            <Head title="Roles" />
            <PageHeader
                eyebrow="Configuración"
                title="Roles del sistema"
                description="Diseña el mapa de acceso de la plataforma y define exactamente qué puede hacer cada perfil."
                actions={[
                    <Link key="create" href={route('admin.settings.roles.create')} className="rounded-full bg-rem-blue px-5 py-3 text-sm font-semibold text-white">
                        Crear rol
                    </Link>,
                ]}
            />
            <DataTable columns={columns} rows={roles} empty="Aún no hay roles configurados." />
        </AdminLayout>
    );
}
