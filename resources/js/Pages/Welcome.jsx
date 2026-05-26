import { Head, Link } from '@inertiajs/react';
import AppLogo from '@/Components/AppLogo';

export default function Welcome({ auth, canLogin }) {
    return (
        <>
            <Head title="Portal privado" />
            <div className="relative min-h-screen overflow-hidden px-6 py-8 lg:px-10">
                <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl lg:p-10">
                    <div className="flex items-center justify-between">
                        <AppLogo />
                        {canLogin && !auth.user && (
                            <Link
                                href={route('login')}
                                className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-rem-blue/60 hover:text-white"
                            >
                                Ingresar
                            </Link>
                        )}
                    </div>

                    <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-rem-blue/30 bg-rem-blue/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-rem-green">
                                Portal privado para socios REM Universe
                            </div>
                            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white lg:text-7xl">
                                Tu participación en <span className="text-gradient">REM Universe</span> con seguimiento claro, visual y seguro.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                                REM Partners centraliza capital, retorno proyectado, reportes, hitos y beneficios REM en una experiencia premium diseñada para aliados fundadores y socios estratégicos.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={route('login')}
                                    className="rounded-full bg-rem-blue px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
                                >
                                    Acceder al portal
                                </Link>
                                <div className="rounded-full border border-rem-green/40 px-6 py-3 text-sm font-semibold text-rem-green">
                                    Seguimiento transparente del aporte
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {[
                                ['Capital objetivo', '$50.000.000 COP'],
                                ['Retorno proyectado', '120% a 150%'],
                                ['Modalidades', 'Dinero, beneficios y experiencias'],
                                ['Cobertura', 'Música, cultura, educación y expansión'],
                            ].map(([label, value]) => (
                                <div key={label} className="glass-panel p-6">
                                    <p className="text-sm uppercase tracking-[0.2em] text-white/45">{label}</p>
                                    <p className="mt-3 text-2xl font-bold text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
