import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import GlassCard from '@/Components/GlassCard';
import GradientButton from '@/Components/GradientButton';
import PageHeader from '@/Components/PageHeader';
import PartnerLayout from '@/Layouts/PartnerLayout';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import { formatCurrency } from '@/lib/utils';

export default function Dashboard({ partner, investment, redemptions, reports, milestones, redeemableItems, documents, capitalAllocations, summary }) {
    const projectionData = investment
        ? [
              { name: 'Capital', value: Number(investment.amount) },
              { name: 'Mínimo', value: Number(investment.projected_min_return) },
              { name: 'Máximo', value: Number(investment.projected_max_return) },
          ]
        : [];

    return (
        <PartnerLayout title="Tu lugar dentro del ecosistema REM">
            <Head title="Dashboard socio" />

            <PageHeader
                eyebrow="Seguimiento transparente"
                title="Tu participación en REM Universe"
                description="Consulta el estado de tu aporte, el retorno proyectado, el avance del ecosistema y los beneficios disponibles desde un solo portal privado."
                badge={partner?.investor_type}
                actions={
                    <>
                        <GradientButton href={route('dashboard')}>Solicitar redención</GradientButton>
                        <button className="rounded-full border border-rem-green/35 px-5 py-3 text-sm font-semibold text-rem-green">
                            Ver contrato
                        </button>
                    </>
                }
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Capital invertido" value={formatCurrency(investment?.amount)} hint="Aporte activo dentro del ecosistema REM" />
                <StatCard label="Retorno mínimo proyectado" value={formatCurrency(investment?.projected_min_return)} accent="green" />
                <StatCard label="Retorno máximo proyectado" value={formatCurrency(investment?.projected_max_return)} />
                <StatCard label="Saldo disponible" value={formatCurrency(investment?.available_amount)} accent="green" />
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-white/55">Proyección de retorno</p>
                            <h3 className="mt-1 text-xl font-bold text-white">Crecimiento estimado de tu participación</h3>
                        </div>
                        <StatusBadge value={investment?.status} />
                    </div>
                    <div className="mt-6 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectionData}>
                                <defs>
                                    <linearGradient id="remArea" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4316ff" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#7cc21f" stopOpacity={0.08} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#7cc21f" fill="url(#remArea)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Avance general REM Universe</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{summary.overall_progress}% completado</h3>
                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-rem-green" style={{ width: `${summary.overall_progress}%` }} />
                    </div>
                    <div className="mt-6 grid gap-4">
                        <div className="rounded-3xl border border-white/10 bg-rem-dark/70 p-4">
                            <p className="text-sm text-white/55">Capital levantado</p>
                            <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(summary.raised_capital)}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-rem-dark/70 p-4">
                            <p className="text-sm text-white/55">Próximo reporte</p>
                            <p className="mt-2 text-lg font-semibold text-white">{summary.next_report_at}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
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
                    <p className="text-sm text-white/55">Últimos hitos del proyecto</p>
                    <div className="mt-6 space-y-4">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06 }}
                                className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-white">{milestone.title}</p>
                                        <p className="mt-1 text-sm text-white/55">{milestone.category}</p>
                                    </div>
                                    <StatusBadge value={milestone.status} />
                                </div>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-rem-blue" style={{ width: `${milestone.progress_percentage}%` }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Documentos recientes</p>
                    <div className="mt-4 space-y-3">
                        {documents.map((document) => (
                            <div key={document.id} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <p className="font-semibold text-white">{document.name}</p>
                                <p className="mt-1 text-sm text-white/50">{document.type}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Reportes publicados</p>
                    <div className="mt-4 space-y-3">
                        {reports.map((report) => (
                            <div key={report.id} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <p className="font-semibold text-white">{report.title}</p>
                                <p className="mt-1 text-sm text-white/50">{report.period}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <p className="text-sm text-white/55">Beneficios REM</p>
                    <div className="mt-4 space-y-3">
                        {redeemableItems.slice(0, 4).map((item) => (
                            <div key={item.id} className="rounded-3xl border border-white/10 bg-rem-dark/60 p-4">
                                <p className="font-semibold text-white">{item.name}</p>
                                <p className="mt-1 text-sm text-white/50">{formatCurrency(item.value)}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </PartnerLayout>
    );
}
