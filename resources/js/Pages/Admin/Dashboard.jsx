import { Head } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import AdminLayout from '@/Layouts/AdminLayout';
import GlassCard from '@/Components/GlassCard';
import PageHeader from '@/Components/PageHeader';
import StatCard from '@/Components/StatCard';
import { formatCurrency } from '@/lib/utils';

export default function Dashboard({ stats, capitalAllocations, recentPartners, recentReports, recentMilestones }) {
    return (
        <AdminLayout title="Control central REM Partners">
            <Head title="Dashboard admin" />

            <PageHeader
                eyebrow="Visión ejecutiva"
                title="Panel administrativo REM"
                description="Monitorea capital levantado, proyecciones, socios activos, redenciones y el avance de las unidades clave del ecosistema."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Capital levantado" value={formatCurrency(stats.raised_capital)} />
                <StatCard label="Meta de capital" value={formatCurrency(stats.capital_goal)} accent="green" />
                <StatCard label="Socios activos" value={stats.active_partners} />
                <StatCard label="Redenciones pendientes" value={stats.pending_redemptions} accent="green" />
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Capital levantado vs meta</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{stats.goal_progress}% alcanzado</h3>
                    <div className="mt-6 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[{ label: 'Capital', actual: stats.raised_capital, meta: stats.capital_goal }]}>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                                <XAxis dataKey="label" stroke="rgba(255,255,255,0.45)" />
                                <Tooltip />
                                <Bar dataKey="actual" fill="#4316ff" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="meta" fill="#7cc21f" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Resumen financiero</p>
                    <div className="mt-5 space-y-4">
                        <div className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                            <p className="text-sm text-white/55">Retorno mínimo proyectado</p>
                            <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(stats.projected_min_return)}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                            <p className="text-sm text-white/55">Retorno máximo proyectado</p>
                            <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(stats.projected_max_return)}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                            <p className="text-sm text-white/55">Total redimido</p>
                            <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(stats.total_redeemed)}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Distribución del capital</p>
                    <div className="mt-4 space-y-3">
                        {capitalAllocations.map((allocation) => (
                            <div key={allocation.id} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-semibold text-white">{allocation.category}</p>
                                    <p className="text-sm text-white/60">{allocation.percentage}%</p>
                                </div>
                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-rem-blue" style={{ width: `${allocation.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Socios recientes</p>
                    <div className="mt-4 space-y-3">
                        {recentPartners.map((partner) => (
                            <div key={partner.id} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <p className="font-semibold text-white">{partner.user?.name}</p>
                                <p className="mt-1 text-sm text-white/50">{partner.city}, {partner.country}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Actualizaciones REM</p>
                    <div className="mt-4 space-y-3">
                        {[...recentReports, ...recentMilestones].slice(0, 4).map((item, index) => (
                            <div key={`${item.id}-${index}`} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <p className="font-semibold text-white">{item.title}</p>
                                <p className="mt-1 text-sm text-white/50">{item.period || item.category || item.status}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
