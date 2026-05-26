import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FormActions from '@/Components/FormActions';

export default function Create({ investors, investments, options }) {
    const { data, setData, post, processing, errors } = useForm({
        investor_profile_id: investors[0]?.id || '',
        investment_id: '',
        name: '',
        type: options.types[0],
        document_file: null,
        status: 'active',
        visible_to_partner: true,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.documents.store'));
    };
    return (
        <AdminLayout title="Crear documento">
            <Head title="Crear documento" />
            <PageHeader eyebrow="Privado" title="Crear documento" />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Socio" /><SelectInput className="mt-1" value={data.investor_profile_id} onChange={(e) => setData('investor_profile_id', e.target.value)}>{investors.map((investor) => <option key={investor.id} value={investor.id}>{investor.user?.name}</option>)}</SelectInput></div>
                        <div><InputLabel value="Inversión" /><SelectInput className="mt-1" value={data.investment_id} onChange={(e) => setData('investment_id', e.target.value)}><option value="">Sin vincular</option>{investments.map((investment) => <option key={investment.id} value={investment.id}>{investment.id} - {investment.investor_profile?.user?.name || investment.investorProfile?.user?.name}</option>)}</SelectInput></div>
                        <div><InputLabel value="Nombre" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.name} onChange={(e) => setData('name', e.target.value)} /><InputError className="mt-2" message={errors.name} /></div>
                        <div><InputLabel value="Tipo" /><SelectInput className="mt-1" value={data.type} onChange={(e) => setData('type', e.target.value)}>{options.types.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Estado" /><SelectInput className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Archivo" /><input type="file" className="mt-1 block w-full text-sm text-white/70" onChange={(e) => setData('document_file', e.target.files[0])} /></div>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={data.visible_to_partner} onChange={(e) => setData('visible_to_partner', e.target.checked)} /> Visible para el socio</label>
                    <FormActions><Link href={route('admin.documents.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>Guardar documento</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
