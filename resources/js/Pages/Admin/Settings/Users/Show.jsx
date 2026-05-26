import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import GlassCard from '@/Components/GlassCard';
import PageHeader from '@/Components/PageHeader';

export default function Show({ user }) {
    return (
        <AdminLayout title="Detalle de usuario">
            <Head title={`Usuario · ${user.name}`} />
            <PageHeader
                eyebrow="Configuración"
                title={user.name}
                description="Resumen del acceso, roles y permisos especiales de este usuario."
                actions={[
                    <Link key="edit" href={route('admin.settings.users.edit', user.id)} className="rounded-full bg-rem-blue px-5 py-3 text-sm font-semibold text-white">
                        Editar usuario
                    </Link>,
                ]}
            />

            <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="p-6 lg:col-span-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Identidad</p>
                    <div className="mt-4 space-y-3 text-sm text-white/75">
                        <p><span className="text-white/45">Correo:</span> {user.email}</p>
                        <p><span className="text-white/45">Verificado:</span> {user.email_verified_at ? 'Sí' : 'No'}</p>
                        <p><span className="text-white/45">Perfil socio:</span> {user.investor_profile ? 'Sí' : 'No'}</p>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Roles</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                            <span key={role.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                                {role.name}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Permisos directos</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {user.permissions.length > 0 ? user.permissions.map((permission) => (
                            <span key={permission.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                                {permission.name}
                            </span>
                        )) : <p className="text-sm text-white/55">Este usuario no tiene permisos directos adicionales.</p>}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
