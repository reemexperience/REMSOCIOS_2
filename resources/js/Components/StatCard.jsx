import GlassCard from '@/Components/GlassCard';

export default function StatCard({ label, value, hint, accent = 'blue' }) {
    return (
        <GlassCard className="p-5">
            <div className={`h-1.5 w-14 rounded-full ${accent === 'green' ? 'bg-rem-green' : 'bg-rem-blue'}`} />
            <p className="mt-5 text-sm text-white/55">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            {hint && <p className="mt-3 text-sm text-white/45">{hint}</p>}
        </GlassCard>
    );
}
