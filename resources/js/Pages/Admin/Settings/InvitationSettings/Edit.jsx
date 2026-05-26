import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import FormActions from '@/Components/FormActions';
import GlassCard from '@/Components/GlassCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        partner_invitation_expiration_hours: settings.partner_invitation_expiration_hours,
    });

    const submit = (event) => {
        event.preventDefault();
        put(route('admin.settings.invitation-settings.update'));
    };

    return (
        <AdminLayout title="Ajustes de invitación">
            <Head title="Ajustes de invitación" />
            <PageHeader
                eyebrow="Configuración"
                title="Duración de invitaciones públicas"
                description="Define por cuántas horas permanece válido cada enlace de creación de socio generado por Admin o Super Admin."
            />

            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="partner_invitation_expiration_hours" value="Horas de vigencia por defecto" />
                        <TextInput
                            id="partner_invitation_expiration_hours"
                            type="number"
                            min="1"
                            max="168"
                            className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                            value={data.partner_invitation_expiration_hours}
                            onChange={(event) => setData('partner_invitation_expiration_hours', event.target.value)}
                        />
                        <p className="mt-2 text-sm text-white/55">Valor recomendado inicial: 3 horas.</p>
                        <InputError className="mt-2" message={errors.partner_invitation_expiration_hours} />
                    </div>

                    <FormActions>
                        <Link href={route('admin.settings.roles.index')} className="text-sm text-white/60">
                            Volver
                        </Link>
                        <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>
                            Guardar duración
                        </PrimaryButton>
                    </FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
