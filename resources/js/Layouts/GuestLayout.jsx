import AppLogo from '@/Components/AppLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-rem-background px-4 py-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl lg:grid-cols-[0.95fr_0.7fr]">
                    <div className="hidden bg-rem-primary p-10 lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <div className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80">
                                REM Partners
                            </div>
                            <h2 className="mt-6 text-5xl font-black leading-tight text-white">
                                Acceso privado al ecosistema REM.
                            </h2>
                            <p className="mt-6 max-w-md text-base leading-8 text-white/80">
                                Seguimiento transparente de tu aporte, reportes, beneficios y avance de las unidades REM desde una experiencia segura y premium.
                            </p>
                        </div>
                        <p className="text-sm text-white/70">REM Universe | socios | aliados fundadores | capital creativo</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <Link href="/">
                            <AppLogo />
                        </Link>
                        <div className="mt-8 w-full rounded-[2rem] border border-white/10 bg-rem-dark/60 px-6 py-6 shadow-soft">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
