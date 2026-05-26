import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import GlassCard from '@/Components/GlassCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import FormActions from '@/Components/FormActions';

export default function Create({ options, item = null }) {
    const editing = Boolean(item);
    const { data, setData, post, processing } = useForm({
        _method: editing ? 'put' : 'post',
        name: item?.name || '',
        type: item?.type || options.types[0],
        category: item?.category || '',
        description: item?.description || '',
        value: item?.value || '',
        stock: item?.stock || 0,
        image_file: null,
        status: item?.status || 'active',
        visible_to_partners: item?.visible_to_partners ?? true,
    });
    const submit = (e) => {
        e.preventDefault();
        post(editing ? route('admin.redeemable-items.update', item.id) : route('admin.redeemable-items.store'));
    };
    return (
        <AdminLayout title={editing ? 'Editar ítem' : 'Nuevo ítem'}>
            <Head title={editing ? 'Editar ítem' : 'Nuevo ítem'} />
            <PageHeader eyebrow="Catálogo" title={editing ? 'Editar ítem' : 'Nuevo ítem'} />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Nombre" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.name} onChange={(e) => setData('name', e.target.value)} /></div>
                        <div><InputLabel value="Tipo" /><SelectInput className="mt-1" value={data.type} onChange={(e) => setData('type', e.target.value)}>{options.types.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Categoría" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.category} onChange={(e) => setData('category', e.target.value)} /></div>
                        <div><InputLabel value="Valor" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.value} onChange={(e) => setData('value', e.target.value)} /></div>
                        <div><InputLabel value="Stock" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.stock} onChange={(e) => setData('stock', e.target.value)} /></div>
                        <div><InputLabel value="Estado" /><SelectInput className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Imagen" /><input type="file" className="mt-1 block w-full text-sm text-white/70" onChange={(e) => setData('image_file', e.target.files[0])} /></div>
                    </div>
                    <div><InputLabel value="Descripción" /><TextareaInput className="mt-1 min-h-28" value={data.description} onChange={(e) => setData('description', e.target.value)} /></div>
                    <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={data.visible_to_partners} onChange={(e) => setData('visible_to_partners', e.target.checked)} /> Visible para socios</label>
                    <FormActions><Link href={route('admin.redeemable-items.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>{editing ? 'Actualizar ítem' : 'Guardar ítem'}</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
