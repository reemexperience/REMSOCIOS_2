import { Head } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';

export default function Show({ report }) {
    return (
        <PartnerLayout title="Detalle del reporte">
            <Head title="Detalle del reporte" />
            <PageHeader eyebrow="Reporte" title={report.title} />
            <GlassCard className="p-6">
                <p className="text-sm text-white/45">Periodo</p>
                <p className="mt-2 text-white/70">{report.period}</p>
                <p className="mt-6 text-sm text-white/45">Descripción</p>
                <p className="mt-2 text-white/70">{report.description}</p>
            </GlassCard>
        </PartnerLayout>
    );
}
