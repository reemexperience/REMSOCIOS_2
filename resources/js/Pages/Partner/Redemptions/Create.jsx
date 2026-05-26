import { Head, Link, useForm } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import FormActions from '@/Components/FormActions';
import { formatCurrency } from '@/lib/utils';

export default function Create({ investments, types }) {
    const { data, setData, post, processing, errors } = useForm({
        investment_id: investments[0]?.id || '',
        requested_amount: '',
        redemption_type: types[0],
        cash_amount: '',
        products_amount: '',
        services_amount: '',
        experiences_amount: '',
        partner_notes: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('partner.redemptions.store'));
    };
    return (
        <PartnerLayout title="Nueva redención">
            <Head title="Nueva redención" />
            <PageHeader eyebrow="Solicitud" title="Solicitar redención" />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="rounded-2xl border border-white/10 p-4 text-sm text-white/60">Saldo disponible: {formatCurrency(investments.find((item) => String(item.id) === String(data.investment_id))?.available_amount)}</div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Inversión" /><SelectInput className="mt-1" value={data.investment_id} onChange={(e) => setData('investment_id', e.target.value)}>{investments.map((investment) => <option key={investment.id} value={investment.id}>{formatCurrency(investment.amount)}</option>)}</SelectInput></div>
                        <div><InputLabel value="Monto solicitado" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.requested_amount} onChange={(e) => setData('requested_amount', e.target.value)} /></div>
                        <div><InputLabel value="Tipo de redención" /><SelectInput className="mt-1" value={data.redemption_type} onChange={(e) => setData('redemption_type', e.target.value)}>{types.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                    </div>
                    <div><InputLabel value="Notas" /><TextareaInput className="mt-1 min-h-24" value={data.partner_notes} onChange={(e) => setData('partner_notes', e.target.value)} /></div>
                    {errors.requested_amount && <p className="text-sm text-red-300">{errors.requested_amount}</p>}
                    <FormActions><Link href={route('partner.redemptions.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>Enviar solicitud</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </PartnerLayout>
    );
}
