import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';

export default function Show({ document }) {
    return (
        <AdminLayout title="Detalle del documento">
            <Head title="Detalle del documento" />
            <PageHeader eyebrow="Documento" title={document.name} badge={document.status} actions={<Link href={route('admin.documents.download', document.id)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Descargar</Link>} />
            <GlassCard className="p-6">
                <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                    <div><p className="text-white/45">Tipo</p><p>{document.type}</p></div>
                    <div><p className="text-white/45">Socio</p><p>{document.investor_profile?.user?.name || document.investorProfile?.user?.name}</p></div>
                </div>
            </GlassCard>
        </AdminLayout>
    );
}
