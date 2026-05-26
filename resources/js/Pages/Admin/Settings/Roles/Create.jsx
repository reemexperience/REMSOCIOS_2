import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import Form from './Form';

export default function Create(props) {
    return (
        <AdminLayout title="Crear rol">
            <Head title="Crear rol" />
            <PageHeader eyebrow="Configuración" title="Crear rol" description="Define un nuevo nivel de acceso y asígnale permisos concretos." />
            <Form {...props} />
        </AdminLayout>
    );
}
