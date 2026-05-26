import { useMemo, useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { Copy, Link2, LoaderCircle, Mail, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/Layouts/AdminLayout';
import GlassCard from '@/Components/GlassCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import { cn } from '@/lib/utils';

function formatDate(value) {
    if (!value) {
        return 'Sin fecha';
    }

    return new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}

function InvitationToast({ url, onCopy }) {
    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Ruta pública creada</p>
            <p className="max-w-sm break-all text-xs text-white/70">{url}</p>
            <button
                type="button"
                onClick={() => onCopy(url)}
                className="rounded-full bg-rem-blue px-3 py-2 text-xs font-semibold text-white"
            >
                Copiar ruta
            </button>
        </div>
    );
}

export default function Index({ invitations, options, defaults, appUrl }) {
    const [mode, setMode] = useState('email');
    const [list, setList] = useState(invitations.data);
    const [sendingEmails, setSendingEmails] = useState(false);
    const [creatingPublic, setCreatingPublic] = useState(false);
    const [emailErrors, setEmailErrors] = useState({});
    const [publicErrors, setPublicErrors] = useState({});

    const [emailForm, setEmailForm] = useState({
        emails: '',
        investor_type: options.types[0] ?? 'founder',
        status: 'pending',
        message: '',
    });

    const [publicForm, setPublicForm] = useState({
        investor_type: options.types[0] ?? 'founder',
        status: 'pending',
        message: '',
    });

    const sortedList = useMemo(() => list, [list]);
    const buildUrl = (token) => `${appUrl}/join/partner/${token}`;

    const copyText = async (value) => {
        await navigator.clipboard.writeText(value);
        toast.success('Copiado al portapapeles.');
    };

    const pushInvitations = (created) => {
        setList((current) => [...created, ...current]);
    };

    const submitEmailInvites = async (event) => {
        event.preventDefault();
        setSendingEmails(true);
        setEmailErrors({});

        const loadingToast = toast.loading('Enviando invitaciones por correo...');

        try {
            const { data } = await axios.post(route('admin.investor-invitations.email'), emailForm);

            pushInvitations(data.invitations);
            setEmailForm((current) => ({ ...current, emails: '', message: '' }));
            toast.success(`${data.created_count} invitación(es) enviada(s).`, { id: loadingToast });
        } catch (error) {
            const validationErrors = error.response?.data?.errors ?? {};
            setEmailErrors(validationErrors);
            toast.error('No fue posible enviar las invitaciones.', { id: loadingToast });
        } finally {
            setSendingEmails(false);
        }
    };

    const submitPublicInvite = async (event) => {
        event.preventDefault();
        setCreatingPublic(true);
        setPublicErrors({});

        const loadingToast = toast.loading('Creando token público...');

        try {
            const { data } = await axios.post(route('admin.investor-invitations.public'), publicForm);

            pushInvitations([data.invitation]);
            setPublicForm((current) => ({ ...current, message: '' }));
            toast.dismiss(loadingToast);
            toast.custom((t) => (
                <div
                    className={cn(
                        'rounded-3xl border border-white/10 bg-rem-surface px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                        t.visible ? 'animate-enter' : 'animate-leave'
                    )}
                >
                    <InvitationToast url={buildUrl(data.invitation.token)} onCopy={copyText} />
                </div>
            ));
        } catch (error) {
            const validationErrors = error.response?.data?.errors ?? {};
            setPublicErrors(validationErrors);
            toast.error('No fue posible crear la ruta pública.', { id: loadingToast });
        } finally {
            setCreatingPublic(false);
        }
    };

    const renderCommonFields = (form, setForm, errors, formKey) => (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <InputLabel htmlFor={`${formKey}-investor_type`} value="Tipo de socio" />
                    <SelectInput
                        id={`${formKey}-investor_type`}
                        className="mt-1"
                        value={form.investor_type}
                        onChange={(event) => setForm((current) => ({ ...current, investor_type: event.target.value }))}
                    >
                        {options.types.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </SelectInput>
                </div>

                <div>
                    <InputLabel htmlFor={`${formKey}-status`} value="Estado inicial" />
                    <SelectInput
                        id={`${formKey}-status`}
                        className="mt-1"
                        value={form.status}
                        onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                    >
                        {options.statuses.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </SelectInput>
                </div>
            </div>

            <div>
                <InputLabel htmlFor={`${formKey}-message`} value="Mensaje de invitación" />
                <TextareaInput
                    id={`${formKey}-message`}
                    className="mt-1 min-h-28"
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Texto opcional que verá el socio al abrir la invitación."
                />
                <InputError className="mt-2" message={errors.message?.[0]} />
            </div>
        </>
    );

    return (
        <AdminLayout title="Invitaciones de socios">
            <Head title="Invitaciones de socios" />

            <PageHeader
                eyebrow="Onboarding privado"
                title="Invitaciones de socios"
                description={`Cada enlace dura ${defaults.expiration_hours} horas por defecto. Separa la invitación por correo del token público para tener más control.`}
            />

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <GlassCard className="p-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setMode('email')}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
                                mode === 'email'
                                    ? 'border-rem-blue bg-rem-blue text-white shadow-glow'
                                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                            )}
                        >
                            <Mail size={16} />
                            Enviar por correo
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode('public')}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
                                mode === 'public'
                                    ? 'border-rem-green bg-rem-green text-rem-background'
                                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                            )}
                        >
                            <Link2 size={16} />
                            Generar ruta pública
                        </button>
                    </div>

                    {mode === 'email' ? (
                        <form onSubmit={submitEmailInvites} className="mt-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="emails" value="Correos de invitación" />
                                <TextareaInput
                                    id="emails"
                                    className="mt-1 min-h-28"
                                    value={emailForm.emails}
                                    onChange={(event) => setEmailForm((current) => ({ ...current, emails: event.target.value }))}
                                    placeholder={`aliado1@correo.com\naliado2@correo.com\naliado3@correo.com`}
                                />
                                <p className="mt-2 text-sm text-white/55">
                                    Puedes separar correos por coma, espacio o salto de línea.
                                </p>
                                <InputError className="mt-2" message={emailErrors.emails?.[0] || emailErrors.email_list?.[0]} />
                            </div>

                            {renderCommonFields(emailForm, setEmailForm, emailErrors, 'email')}

                            <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={sendingEmails}>
                                {sendingEmails ? (
                                    <span className="inline-flex items-center gap-2">
                                        <LoaderCircle size={16} className="animate-spin" />
                                        Enviando invitaciones...
                                    </span>
                                ) : (
                                    'Enviar invitaciones'
                                )}
                            </PrimaryButton>
                        </form>
                    ) : (
                        <form onSubmit={submitPublicInvite} className="mt-6 space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/55">
                                Este modo crea una ruta pública con token usando exactamente <code>APP_URL + /join/partner/{'{token}'}</code>.
                            </div>

                            {renderCommonFields(publicForm, setPublicForm, publicErrors, 'public')}

                            <PrimaryButton
                                className="bg-rem-green text-rem-background hover:bg-rem-green/90"
                                disabled={creatingPublic}
                            >
                                {creatingPublic ? (
                                    <span className="inline-flex items-center gap-2">
                                        <LoaderCircle size={16} className="animate-spin" />
                                        Creando token...
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2">
                                        <Sparkles size={16} />
                                        Generar ruta pública
                                    </span>
                                )}
                            </PrimaryButton>
                        </form>
                    )}
                </GlassCard>

                <div className="space-y-4">
                    {sortedList.map((invitation) => {
                        const isExpired = invitation.used_at === null && new Date(invitation.expires_at) < new Date();
                        const publicUrl = buildUrl(invitation.token);

                        return (
                            <GlassCard key={invitation.id} className="p-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-white">
                                                {invitation.email || 'Ruta pública abierta'}
                                            </p>
                                            <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                                                {invitation.investor_type} · {invitation.status}
                                            </p>
                                            <p className="text-sm text-white/60">
                                                {invitation.mode === 'email' ? 'Correo específico' : 'Ruta pública abierta'} · creada por{' '}
                                                {invitation.creator?.name}
                                            </p>
                                            <p className="text-sm text-white/55">Vence {formatDate(invitation.expires_at)}</p>
                                            {invitation.notes && <p className="text-sm text-white/55">{invitation.notes}</p>}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                        onClick={() => copyText(publicUrl)}
                                                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-rem-blue/50 hover:text-white"
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <Copy size={14} />
                                                    Copiar ruta
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => copyText(invitation.token)}
                                                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-rem-green/50 hover:text-white"
                                            >
                                                Copiar token
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/50">
                                            <p className="mb-2 uppercase tracking-[0.24em] text-white/30">Ruta desde APP_URL</p>
                                            <div className="break-all">{publicUrl}</div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/50">
                                            <p className="mb-2 uppercase tracking-[0.24em] text-white/30">Token</p>
                                            <div className="break-all">{invitation.token}</div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/50">
                                        {invitation.used_at
                                            ? `Usada el ${formatDate(invitation.used_at)}`
                                            : isExpired
                                                ? 'Vencida'
                                                : 'Disponible'}
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
