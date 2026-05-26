import StatusBadge from '@/Components/StatusBadge';

export default function PageHeader({ eyebrow, title, description, badge, actions }) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
                {eyebrow && <p className="text-xs uppercase tracking-[0.32em] text-rem-green">{eyebrow}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">{title}</h1>
                    {badge && <StatusBadge value={badge} />}
                </div>
                {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
    );
}
