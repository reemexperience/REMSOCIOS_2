import { Link, useForm } from '@inertiajs/react';
import GlassCard from '@/Components/GlassCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormActions from '@/Components/FormActions';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

function CheckboxGrid({ items, values, onToggle, label }) {
    return (
        <div>
            <InputLabel value={label} />
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                    <label key={item.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                        <input
                            type="checkbox"
                            checked={values.includes(item.name)}
                            onChange={() => onToggle(item.name)}
                            className="rounded border-white/15 bg-rem-dark text-rem-blue focus:ring-rem-blue"
                        />
                        <span>{item.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default function Form({ user = null, roles, permissions }) {
    const editing = Boolean(user);
    const { data, setData, post, processing, errors } = useForm({
        _method: editing ? 'put' : 'post',
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        email_verified_at: user?.email_verified_at ? user.email_verified_at.slice(0, 10) : '',
        role_names: user?.roles?.map((role) => role.name) ?? [],
        direct_permissions: user?.permissions?.map((permission) => permission.name) ?? [],
    });

    const toggleArrayValue = (field, value) => {
        setData(
            field,
            data[field].includes(value) ? data[field].filter((item) => item !== value) : [...data[field], value]
        );
    };

    const submit = (event) => {
        event.preventDefault();
        post(editing ? route('admin.settings.users.update', user.id) : route('admin.settings.users.store'));
    };

    return (
        <GlassCard className="p-6">
            <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Correo" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value={editing ? 'Nueva contraseña' : 'Contraseña'} />
                        <TextInput
                            id="password"
                            type="password"
                            className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                        />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email_verified_at" value="Correo verificado el" />
                        <TextInput
                            id="email_verified_at"
                            type="date"
                            className="mt-1 block w-full border-white/10 bg-white/5 text-white"
                            value={data.email_verified_at}
                            onChange={(event) => setData('email_verified_at', event.target.value)}
                        />
                        <InputError className="mt-2" message={errors.email_verified_at} />
                    </div>
                </div>

                <CheckboxGrid
                    items={roles}
                    values={data.role_names}
                    onToggle={(value) => toggleArrayValue('role_names', value)}
                    label="Roles asignados"
                />
                <InputError className="mt-2" message={errors.role_names} />

                <CheckboxGrid
                    items={permissions}
                    values={data.direct_permissions}
                    onToggle={(value) => toggleArrayValue('direct_permissions', value)}
                    label="Permisos directos"
                />

                <FormActions>
                    <Link href={route('admin.settings.users.index')} className="text-sm text-white/60">
                        Cancelar
                    </Link>
                    <PrimaryButton className="bg-rem-blue hover:bg-rem-blue/90" disabled={processing}>
                        {editing ? 'Actualizar usuario' : 'Guardar usuario'}
                    </PrimaryButton>
                </FormActions>
            </form>
        </GlassCard>
    );
}
