export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rem-primary shadow-glow">
                <span className="text-lg font-black text-white">RM</span>
            </div>
            <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/45">REM Universe</p>
                <p className="text-lg font-bold text-white">REM Partners</p>
            </div>
        </div>
    );
}
