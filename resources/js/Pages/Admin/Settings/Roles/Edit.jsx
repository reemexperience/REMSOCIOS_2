import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/PageHeader';
import Form from './Form';

export default function Edit(props) {
    return (
        <AdminLayout title="Editar rol">
            <Head title="Editar rol" />
            <PageHeader eyebrow="Configuración" title="Editar rol" description="Ajusta el alcance del rol sin tocar usuario por usuario." />
            <Form {...props} />
        </AdminLayout>
    );
}
