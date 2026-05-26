import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FormActions from '@/Components/FormActions';

export default function Create({ options, investor = null }) {
    const editing = Boolean(investor);
    const { data, setData, post, processing, errors } = useForm({
        _method: editing ? 'put' : 'post',
        name: investor?.user?.name || '',
        email: investor?.user?.email || '',
        password: '',
        document_type: investor?.document_type || '',
        document_number: investor?.document_number || '',
        phone: investor?.phone || '',
        city: investor?.city || '',
        country: investor?.country || 'Colombia',
        investor_type: investor?.investor_type || 'founder',
        status: investor?.status || 'active',
        joined_at: investor?.joined_at || '',
        notes: investor?.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(editing ? route('admin.investors.update', investor.id) : route('admin.investors.store'));
    };

    return (
        <AdminLayout title={editing ? 'Editar socio' : 'Crear socio'}>
            <Head title={editing ? 'Editar socio' : 'Crear socio'} />
            <PageHeader eyebrow="Nuevo perfil" title={editing ? 'Editar socio' : 'Crear socio'} />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel htmlFor="name" value="Nombre" /><TextInput id="name" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.name} onChange={(e) => setData('name', e.target.value)} /><InputError className="mt-2" message={errors.name} /></div>
                        <div><InputLabel htmlFor="email" value="Correo" /><TextInput id="email" type="email" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.email} onChange={(e) => setData('email', e.target.value)} /><InputError className="mt-2" message={errors.email} /></div>
                        <div><InputLabel htmlFor="password" value="Contraseña temporal" /><TextInput id="password" type="password" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.password} onChange={(e) => setData('password', e.target.value)} /></div>
                        <div><InputLabel htmlFor="document_type" value="Tipo de documento" /><TextInput id="document_type" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.document_type} onChange={(e) => setData('document_type', e.target.value)} /></div>
                        <div><InputLabel htmlFor="document_number" value="Número de documento" /><TextInput id="document_number" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.document_number} onChange={(e) => setData('document_number', e.target.value)} /></div>
                        <div><InputLabel htmlFor="phone" value="Teléfono" /><TextInput id="phone" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.phone} onChange={(e) => setData('phone', e.target.value)} /></div>
                        <div><InputLabel htmlFor="city" value="Ciudad" /><TextInput id="city" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.city} onChange={(e) => setData('city', e.target.value)} /></div>
                        <div><InputLabel htmlFor="country" value="País" /><TextInput id="country" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.country} onChange={(e) => setData('country', e.target.value)} /></div>
                        <div><InputLabel htmlFor="investor_type" value="Tipo de socio" /><SelectInput id="investor_type" className="mt-1" value={data.investor_type} onChange={(e) => setData('investor_type', e.target.value)}>{options.types.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel htmlFor="status" value="Estado" /><SelectInput id="status" className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel htmlFor="joined_at" value="Fecha de ingreso" /><TextInput id="joined_at" type="date" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.joined_at} onChange={(e) => setData('joined_at', e.target.value)} /></div>
                    </div>
                    <div><InputLabel htmlFor="notes" value="Notas" /><TextareaInput id="notes" className="mt-1 min-h-28" value={data.notes} onChange={(e) => setData('notes', e.target.value)} /></div>
                    <FormActions>
                        <Link href={route('admin.investors.index')} className="text-sm text-white/60">Cancelar</Link>
                        <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>{editing ? 'Actualizar socio' : 'Guardar socio'}</PrimaryButton>
                    </FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
