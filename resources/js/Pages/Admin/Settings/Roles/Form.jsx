import { Link, useForm } from '@inertiajs/react';
import GlassCard from '@/Components/GlassCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormActions from '@/Components/FormActions';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Form({ role = null, permissions }) {
    const editing = Boolean(role);
    const { data, setData, post, processing, errors } = useForm({
        _method: editing ? 'put' : 'post',
        name: role?.name ?? '',
        permission_names: role?.permissions?.map((permission) => permission.name) ?? [],
    });

    const togglePermission = (permissionName) => {
        setData(
            'permission_names',
            data.permission_names.includes(permissionName)
                ? data.permission_names.filter((name) => name !== permissionName)
                : [...data.permission_names, permissionName]
        );
    };

    const submit = (event) => {
        event.preventDefault();
        post(editing ? route('admin.settings.roles.update', role.id) : route('admin.settings.roles.store'));
    };

    return (
        <GlassCard className="p-6">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre del rol" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel value="Permisos del rol" />
                    <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                                <input
                                    type="checkbox"
                                    checked={data.permission_names.includes(permission.name)}
                                    onChange={() => togglePermission(permission.name)}
                                    className="rounded border-white/15 bg-rem-dark text-rem-blue focus:ring-rem-blue"
                                />
                                <span>{permission.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <FormActions>
                    <Link href={route('admin.settings.roles.index')} className="text-sm text-white/60">
                        Cancelar
                    </Link>
                    <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>
                        {editing ? 'Actualizar rol' : 'Guardar rol'}
                    </PrimaryButton>
                </FormActions>
            </form>
        </GlassCard>
    );
}
