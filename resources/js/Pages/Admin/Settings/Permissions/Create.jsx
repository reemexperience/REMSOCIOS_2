import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import FormActions from '@/Components/FormActions';
import GlassCard from '@/Components/GlassCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({ name: '' });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.settings.permissions.store'));
    };

    return (
        <AdminLayout title="Crear permiso">
            <Head title="Crear permiso" />
            <PageHeader eyebrow="Configuración" title="Crear permiso" description="Agrega una nueva capacidad al sistema para reutilizarla luego en los roles." />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre del permiso" />
                        <TextInput id="name" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.name} onChange={(event) => setData('name', event.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <FormActions>
                        <Link href={route('admin.settings.permissions.index')} className="text-sm text-white/60">Cancelar</Link>
                        <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>Guardar permiso</PrimaryButton>
                    </FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
