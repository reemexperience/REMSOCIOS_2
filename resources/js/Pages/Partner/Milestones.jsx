import { Head } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import StatusBadge from '@/Components/StatusBadge';

export default function Milestones({ milestones }) {
    return (
        <PartnerLayout title="Hitos">
            <Head title="Hitos" />
            <PageHeader eyebrow="Avance" title="Hitos del ecosistema" />
            <div className="grid gap-4 md:grid-cols-2">
                {milestones.data.map((milestone) => (
                    <GlassCard key={milestone.id} className="p-6">
                        <div className="flex items-center justify-between gap-4"><h3 className="text-lg font-bold text-white">{milestone.title}</h3><StatusBadge value={milestone.status} /></div>
                        <p className="mt-2 text-sm text-white/60">{milestone.description}</p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-rem-blue" style={{ width: `${milestone.progress_percentage}%` }} /></div>
                    </GlassCard>
                ))}
            </div>
        </PartnerLayout>
    );
}
