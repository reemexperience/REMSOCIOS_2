import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';

export default function Show({ report }) {
    return (
        <AdminLayout title="Detalle del reporte">
            <Head title="Detalle del reporte" />
            <PageHeader eyebrow="Reporte" title={report.title} badge={report.status} actions={<Link href={route('admin.reports.edit', report.id)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Editar</Link>} />
            <GlassCard className="p-6">
                <div className="grid gap-4 md:grid-cols-2 text-sm text-white/70">
                    <div><p className="text-white/45">Tipo</p><p>{report.type}</p></div>
                    <div><p className="text-white/45">Visibilidad</p><StatusBadge value={report.visibility} /></div>
                    <div><p className="text-white/45">Periodo</p><p>{report.period}</p></div>
                    <div><p className="text-white/45">Publicado</p><p>{report.published_at}</p></div>
                </div>
                <div className="mt-6"><p className="text-white/45">Descripción</p><p className="mt-2 text-white/70">{report.description}</p></div>
            </GlassCard>
        </AdminLayout>
    );
}
