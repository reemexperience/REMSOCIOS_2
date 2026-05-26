import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import GlassCard from '@/Components/GlassCard';
import PageHeader from '@/Components/PageHeader';

export default function Show({ role }) {
    return (
        <AdminLayout title="Detalle del rol">
            <Head title={`Rol · ${role.name}`} />
            <PageHeader
                eyebrow="Configuración"
                title={role.name}
                description="Consulta a quién impacta este rol y cuáles permisos entrega dentro del sistema."
                actions={[
                    <Link key="edit" href={route('admin.settings.roles.edit', role.id)} className="rounded-full bg-rem-blue px-5 py-3 text-sm font-semibold text-white">
                        Editar rol
                    </Link>,
                ]}
            />

            <div className="grid gap-4 lg:grid-cols-2">
                <GlassCard className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Permisos</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                            <span key={permission.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                                {permission.name}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Usuarios con este rol</p>
                    <div className="mt-4 space-y-3">
                        {role.users.length > 0 ? role.users.map((user) => (
                            <div key={user.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="font-semibold text-white">{user.name}</p>
                                <p className="text-sm text-white/50">{user.email}</p>
                            </div>
                        )) : <p className="text-sm text-white/55">Ningún usuario tiene este rol por ahora.</p>}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
