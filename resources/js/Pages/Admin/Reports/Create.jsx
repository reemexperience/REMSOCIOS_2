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

export default function Create({ options, report = null }) {
    const editing = Boolean(report);
    const { data, setData, post, processing, errors } = useForm({
        _method: editing ? 'put' : 'post',
        title: report?.title || '',
        description: report?.description || '',
        period: report?.period || '',
        type: report?.type || options.types[0],
        report_file: null,
        image_file: null,
        status: report?.status || 'draft',
        visibility: report?.visibility || 'all_partners',
        published_at: report?.published_at || '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(editing ? route('admin.reports.update', report.id) : route('admin.reports.store'));
    };
    return (
        <AdminLayout title={editing ? 'Editar reporte' : 'Nuevo reporte'}>
            <Head title={editing ? 'Editar reporte' : 'Nuevo reporte'} />
            <PageHeader eyebrow="Transparencia" title={editing ? 'Editar reporte' : 'Nuevo reporte'} />
            <GlassCard className="p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div><InputLabel value="Título" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.title} onChange={(e) => setData('title', e.target.value)} /><InputError className="mt-2" message={errors.title} /></div>
                        <div><InputLabel value="Periodo" /><TextInput className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.period} onChange={(e) => setData('period', e.target.value)} /></div>
                        <div><InputLabel value="Tipo" /><SelectInput className="mt-1" value={data.type} onChange={(e) => setData('type', e.target.value)}>{options.types.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Estado" /><SelectInput className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>{options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Visibilidad" /><SelectInput className="mt-1" value={data.visibility} onChange={(e) => setData('visibility', e.target.value)}>{options.visibilities.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                        <div><InputLabel value="Publicado en" /><TextInput type="date" className="mt-1 block w-full border-white/10 bg-white/5 text-white" value={data.published_at} onChange={(e) => setData('published_at', e.target.value)} /></div>
                        <div><InputLabel value="Archivo reporte" /><input type="file" className="mt-1 block w-full text-sm text-white/70" onChange={(e) => setData('report_file', e.target.files[0])} /></div>
                        <div><InputLabel value="Imagen" /><input type="file" className="mt-1 block w-full text-sm text-white/70" onChange={(e) => setData('image_file', e.target.files[0])} /></div>
                    </div>
                    <div><InputLabel value="Descripción" /><TextareaInput className="mt-1 min-h-28" value={data.description} onChange={(e) => setData('description', e.target.value)} /></div>
                    <FormActions><Link href={route('admin.reports.index')} className="text-sm text-white/60">Cancelar</Link><PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>{editing ? 'Actualizar reporte' : 'Guardar reporte'}</PrimaryButton></FormActions>
                </form>
            </GlassCard>
        </AdminLayout>
    );
}
