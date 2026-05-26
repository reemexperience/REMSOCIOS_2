import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import Form from './Form';

export default function Edit(props) {
    return (
        <AdminLayout title="Editar usuario">
            <Head title="Editar usuario" />
            <PageHeader
                eyebrow="Configuración"
                title="Editar usuario"
                description="Actualiza los accesos, roles y permisos especiales de este usuario."
            />
            <Form {...props} />
        </AdminLayout>
    );
}
