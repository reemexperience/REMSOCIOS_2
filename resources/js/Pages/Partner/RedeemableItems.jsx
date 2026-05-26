import { Head } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import { formatCurrency } from '@/lib/utils';

export default function RedeemableItems({ items }) {
    return (
        <PartnerLayout title="Beneficios REM">
            <Head title="Beneficios REM" />
            <PageHeader eyebrow="Beneficios" title="Catálogo redimible" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.data.map((item) => (
                    <GlassCard key={item.id} className="p-6">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">{item.category}</p>
                        <h3 className="mt-2 text-xl font-bold text-white">{item.name}</h3>
                        <p className="mt-2 text-sm text-white/60">{item.description}</p>
                        <p className="mt-4 text-lg font-semibold text-rem-green">{formatCurrency(item.value)}</p>
                    </GlassCard>
                ))}
            </div>
        </PartnerLayout>
    );
}
