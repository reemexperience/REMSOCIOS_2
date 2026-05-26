import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function Index({ users, roles, filters }) {
    const applyFilter = (field, value) => {
        router.get(route('admin.settings.users.index'), { ...filters, [field]: value }, { preserveState: true, replace: true });
    };

    const columns = [
        { key: 'name', label: 'Usuario', render: (user) => <div><p className="font-semibold text-white">{user.name}</p><p className="text-xs text-white/45">{user.email}</p></div> },
        { key: 'roles', label: 'Roles', render: (user) => <div className="flex flex-wrap gap-2">{user.roles.map((role) => <span key={role.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{role.name}</span>)}</div> },
        { key: 'permissions', label: 'Permisos directos', render: (user) => <span className="text-sm text-white/60">{user.permissions.length}</span> },
        { key: 'investor_profile', label: 'Perfil socio', render: (user) => <span className="text-sm text-white/60">{user.investor_profile ? 'Sí' : 'No'}</span> },
        {
            key: 'actions',
            label: 'Acciones',
            render: (user) => (
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href={route('admin.settings.users.show', user.id)} className="text-rem-green">Ver</Link>
                    <Link href={route('admin.settings.users.edit', user.id)} className="text-rem-blue">Editar</Link>
                    <button type="button" onClick={() => router.delete(route('admin.settings.users.destroy', user.id))} className="text-red-400">Eliminar</button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Usuarios">
            <Head title="Usuarios" />
            <PageHeader
                eyebrow="Configuración"
                title="Usuarios del sistema"
                description="Administra los accesos internos y revisa rápidamente quién tiene qué nivel de control."
                actions={[
                    <Link key="create" href={route('admin.settings.users.create')} className="rounded-full bg-rem-blue px-5 py-3 text-sm font-semibold text-white">
                        Crear usuario
                    </Link>,
                ]}
            />

            <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                <TextInput
                    placeholder="Buscar por nombre o correo"
                    className="block w-full border-white/10 bg-white/5 text-white"
                    defaultValue={filters.search ?? ''}
                    onBlur={(event) => applyFilter('search', event.target.value)}
                />
                <SelectInput
                    className="bg-white/5"
                    value={filters.role ?? ''}
                    onChange={(event) => applyFilter('role', event.target.value)}
                >
                    <option value="">Todos los roles</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </SelectInput>
            </div>

            <div className="mt-6">
                <DataTable columns={columns} rows={users.data} empty="Aún no hay usuarios registrados en este módulo." />
            </div>
        </AdminLayout>
    );
}
