import { useEffect, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import GlassCard from '@/Components/GlassCard';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { formatCurrency } from '@/lib/utils';

const emptyForm = (defaultStatus) => ({
    category: '',
    description: '',
    allocated_amount: '',
    spent_amount: '',
    percentage: '',
    status: defaultStatus,
});

export default function Index({ allocations, statuses }) {
    const defaultStatus = statuses[0] ?? 'planned';
    const [editingId, setEditingId] = useState(null);
    const { data, setData, post, put, reset, processing } = useForm(emptyForm(defaultStatus));

    useEffect(() => {
        if (!editingId) {
            reset();
            setData(emptyForm(defaultStatus));
        }
    }, [editingId, defaultStatus, reset, setData]);

    const submit = (event) => {
        event.preventDefault();

        if (editingId) {
            put(route('admin.capital-allocations.update', editingId), {
                onSuccess: () => setEditingId(null),
            });
            return;
        }

        post(route('admin.capital-allocations.store'), {
            onSuccess: () => {
                reset();
                setData(emptyForm(defaultStatus));
            },
        });
    };

    const startEdit = (allocation) => {
        setEditingId(allocation.id);
        setData({
            category: allocation.category ?? '',
            description: allocation.description ?? '',
            allocated_amount: allocation.allocated_amount ?? '',
            spent_amount: allocation.spent_amount ?? '',
            percentage: allocation.percentage ?? '',
            status: allocation.status ?? defaultStatus,
        });
    };

    const cancelEdit = () => setEditingId(null);

    return (
        <AdminLayout title="Asignaciones de capital">
            <Head title="Asignaciones de capital" />

            <PageHeader
                eyebrow="Capital"
                title="Asignaciones de capital"
                description="Organiza la distribución del capital REM y ajusta cada partida desde un solo lugar."
            />

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <GlassCard className="p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel value="Categoría" />
                            <TextInput
                                className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                                value={data.category}
                                onChange={(event) => setData('category', event.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel value="Descripción" />
                            <TextareaInput
                                className="mt-1 min-h-24"
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel value="Monto asignado" />
                            <TextInput
                                className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                                value={data.allocated_amount}
                                onChange={(event) => setData('allocated_amount', event.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel value="Monto gastado" />
                            <TextInput
                                className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                                value={data.spent_amount}
                                onChange={(event) => setData('spent_amount', event.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel value="Porcentaje" />
                            <TextInput
                                className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                                value={data.percentage}
                                onChange={(event) => setData('percentage', event.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel value="Estado" />
                            <SelectInput
                                className="mt-1"
                                value={data.status}
                                onChange={(event) => setData('status', event.target.value)}
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>
                                {editingId ? 'Actualizar asignación' : 'Guardar asignación'}
                            </PrimaryButton>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
                                >
                                    Cancelar edición
                                </button>
                            )}
                        </div>
                    </form>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="space-y-3">
                        {allocations.map((allocation) => (
                            <div key={allocation.id} className="rounded-2xl border border-white/10 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-white">{allocation.category}</p>
                                        <p className="text-sm text-white/50">{allocation.description}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => startEdit(allocation)}
                                            className="text-sm text-rem-green transition hover:text-rem-green/80"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => router.delete(route('admin.capital-allocations.destroy', allocation.id))}
                                            className="text-sm text-red-400"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-white/70">
                                    Asignado: {formatCurrency(allocation.allocated_amount)} · Gastado: {formatCurrency(allocation.spent_amount)}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/35">
                                    {allocation.status} · {allocation.percentage}%
                                </p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}
