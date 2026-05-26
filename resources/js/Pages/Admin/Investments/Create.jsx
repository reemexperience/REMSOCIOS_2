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

export default function Create({ investors, documents, options, investment = null }) {
    const editing = Boolean(investment);
    const { data, setData, post, processing, errors } = useForm({
        _method: editing ? 'put' : 'post',
        investor_profile_id: investment?.investor_profile_id || '',
        amount: investment?.amount || '',
        currency: investment?.currency || 'COP',
        investment_date: investment?.investment_date || '',
        return_min_percentage: investment?.return_min_percentage || 30,
        return_max_percentage: investment?.return_max_percentage || 80,
        available_amount: investment?.available_amount || '',
        return_type: investment?.return_type || 'hybrid',
        status: investment?.status || 'active',
        contract_document_id: investment?.contract_document_id || '',
        notes: investment?.notes || '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(editing ? route('admin.investments.update', investment.id) : route('admin.investments.store'));
    };
    return (
        <AdminLayout title={editing ? 'Editar inversión' : 'Nueva inversión'}>
            <Head title={editing ? 'Editar inversión' : 'Nueva inversión'} />
            <PageHeader eyebrow="Capital" title={editing ? 'Editar inversión' : 'Nueva inversión'} />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Socio" /><SelectInput className="mt-1" value={data.investor_profile_id} onChange={(e) => setData('investor_profile_id', e.target.value)}>{investors.map((investor) => <option key={investor.id} value={investor.id}>{investor.user?.name}</option>)}</SelectInput><InputError className="mt-2" message={errors.investor_profile_id} /></div>
                        <div><InputLabel value="Monto" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.amount} onChange={(e) => setData('amount', e.target.value)} /></div>
                        <div><InputLabel value="Moneda" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.currency} onChange={(e) => setData('currency', e.target.value)} /></div>
                        <div><InputLabel value="Fecha de inversión" /><TextInput type="date" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.investment_date} onChange={(e) => setData('investment_date', e.target.value)} /></div>
                        <div><InputLabel value="Retorno mínimo %" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.return_min_percentage} onChange={(e) => setData('return_min_percentage', e.target.value)} /></div>
                        <div><InputLabel value="Retorno máximo %" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.return_max_percentage} onChange={(e) => setData('return_max_percentage', e.target.value)} /></div>
                        <div><InputLabel value="Saldo disponible inicial" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.available_amount} onChange={(e) => setData('available_amount', e.target.value)} /></div>
                        <div><InputLabel value="Tipo de retorno" /><SelectInput className="mt-1" value={data.return_type} onChange={(e) => setData('return_type', e.target.value)}>{options.returnTypes.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Estado" /><SelectInput className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Documento contrato" /><SelectInput className="mt-1" value={data.contract_document_id} onChange={(e) => setData('contract_document_id', e.target.value)}><option value="">Sin documento</option>{documents.map((document) => <option key={document.id} value={document.id}>{document.name}</option>)}</SelectInput></div>
                    </div>
                    <div><InputLabel value="Notas" /><TextareaInput className="mt-1 min-h-28" value={data.notes} onChange={(e) => setData('notes', e.target.value)} /></div>
                    <FormActions><Link href={route('admin.investments.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>{editing ? 'Actualizar inversión' : 'Guardar inversión'}</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
