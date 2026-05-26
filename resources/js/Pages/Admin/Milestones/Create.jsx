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

export default function Create({ options, milestone = null }) {
    const editing = Boolean(milestone);
    const { data, setData, post, processing } = useForm({
        _method: editing ? 'put' : 'post',
        title: milestone?.title || '',
        description: milestone?.description || '',
        category: milestone?.category || options.categories[0],
        progress_percentage: milestone?.progress_percentage || 0,
        status: milestone?.status || 'planned',
        media_file: null,
        visible_to_partners: milestone?.visible_to_partners || true,
        date: milestone?.date || '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(editing ? route('admin.milestones.update', milestone.id) : route('admin.milestones.store'));
    };
    return (
        <AdminLayout title={editing ? 'Editar hito' : 'Nuevo hito'}>
            <Head title={editing ? 'Editar hito' : 'Nuevo hito'} />
            <PageHeader eyebrow="Avance" title={editing ? 'Editar hito' : 'Nuevo hito'} />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Título" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                        <div><InputLabel value="Categoría" /><SelectInput className="mt-1" value={data.category} onChange={(e) => setData('category', e.target.value)}>{options.categories.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Avance %" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.progress_percentage} onChange={(e) => setData('progress_percentage', e.target.value)} /></div>
                        <div><InputLabel value="Estado" /><SelectInput className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Fecha" /><TextInput type="date" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.date} onChange={(e) => setData('date', e.target.value)} /></div>
                        <div><InputLabel value="Media" /><input type="file" className="mt-1 block w-full text-sm text-white/70" onChange={(e) => setData('media_file', e.target.files[0])} /></div>
                    </div>
                    <div><InputLabel value="Descripción" /><TextareaInput className="mt-1 min-h-28" value={data.description} onChange={(e) => setData('description', e.target.value)} /></div>
                    <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={data.visible_to_partners} onChange={(e) => setData('visible_to_partners', e.target.checked)} /> Visible para socios</label>
                    <FormActions><Link href={route('admin.milestones.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>{editing ? 'Actualizar hito' : 'Guardar hito'}</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
