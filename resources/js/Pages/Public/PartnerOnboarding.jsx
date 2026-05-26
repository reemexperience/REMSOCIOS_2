import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';

function formatDate(value) {
    if (!value) {
        return '';
    }

    return new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(new Date(value));
}

export default function PartnerOnboarding({ token, invitation, isAvailable }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: invitation.email ?? '',
        password: '',
        document_type: '',
        document_number: '',
        phone: '',
        city: '',
        country: 'Colombia',
        notes: '',
        terms: false,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('partner.onboarding.store', token));
    };

    return (
        <GuestLayout>
            <Head title="Activar perfil de socio" />

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rem-green">Invitación privada</p>
                <h1 className="mt-3 text-3xl font-black text-white">Completa tu perfil de socio REM</h1>
                <p className="mt-3 text-sm leading-7 text-white/65">
                    Este enlace fue preparado para vincular tu participación al portal privado REM Partners.
                </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
                    <p><span className="text-white/45">Tipo de socio:</span> {invitation.investor_type}</p>
                    <p><span className="text-white/45">Estado inicial:</span> {invitation.status}</p>
                    <p><span className="text-white/45">Generada por:</span> {invitation.created_by_name}</p>
                    <p><span className="text-white/45">Vence:</span> {formatDate(invitation.expires_at)}</p>
                </div>
                {invitation.notes && <p className="mt-4 text-sm text-white/60">{invitation.notes}</p>}
            </div>

            {!isAvailable ? (
                <div className="mt-6 rounded-[1.5rem] border border-rem-green/20 bg-rem-green/10 p-5 text-sm leading-7 text-white/75">
                    Este enlace ya no está disponible. Puede haber vencido o ya fue usado. Si necesitas continuar, solicita a REM Universe una nueva invitación.
                </div>
            ) : (
                <form onSubmit={submit} className="mt-6 space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre completo" />
                            <TextInput id="name" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.name} onChange={(event) => setData('name', event.target.value)} />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Correo" />
                            <TextInput id="email" type="email" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.email} onChange={(event) => setData('email', event.target.value)} readOnly={Boolean(invitation.email)} />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <TextInput id="password" type="password" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.password} onChange={(event) => setData('password', event.target.value)} />
                            <InputError className="mt-2" message={errors.password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Teléfono" />
                            <TextInput id="phone" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.phone} onChange={(event) => setData('phone', event.target.value)} />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div>
                            <InputLabel htmlFor="document_type" value="Tipo de documento" />
                            <TextInput id="document_type" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.document_type} onChange={(event) => setData('document_type', event.target.value)} />
                            <InputError className="mt-2" message={errors.document_type} />
                        </div>

                        <div>
                            <InputLabel htmlFor="document_number" value="Número de documento" />
                            <TextInput id="document_number" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.document_number} onChange={(event) => setData('document_number', event.target.value)} />
                            <InputError className="mt-2" message={errors.document_number} />
                        </div>

                        <div>
                            <InputLabel htmlFor="city" value="Ciudad" />
                            <TextInput id="city" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.city} onChange={(event) => setData('city', event.target.value)} />
                            <InputError className="mt-2" message={errors.city} />
                        </div>

                        <div>
                            <InputLabel htmlFor="country" value="País" />
                            <TextInput id="country" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.country} onChange={(event) => setData('country', event.target.value)} />
                            <InputError className="mt-2" message={errors.country} />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="notes" value="Notas adicionales" />
                        <TextareaInput id="notes" className="mt-1 min-h-28" value={data.notes} onChange={(event) => setData('notes', event.target.value)} />
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                        <input
                            type="checkbox"
                            checked={data.terms}
                            onChange={(event) => setData('terms', event.target.checked)}
                            className="mt-1 rounded border-white/15 bg-rem-dark text-rem-blue focus:ring-rem-blue"
                        />
                        <span>Acepto que esta información se use para crear mi perfil privado de socio en REM Partners.</span>
                    </label>
                    <InputError className="mt-2" message={errors.terms} />

                    <PrimaryButton className="w-full justify-center bg-rem-blue py-3 hover:bg-rem-blue/90" disabled={processing}>
                        Crear mi perfil
                    </PrimaryButton>
                </form>
            )}
        </GuestLayout>
    );
}
