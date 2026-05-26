import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import Form from './Form';

export default function Create(props) {
    return (
        <AdminLayout title="Crear usuario">
            <Head title="Crear usuario" />
            <PageHeader
                eyebrow="Configuración"
                title="Crear usuario"
                description="Crea accesos internos para el equipo REM y define sus roles desde el inicio."
            />
            <Form {...props} />
        </AdminLayout>
    );
}
