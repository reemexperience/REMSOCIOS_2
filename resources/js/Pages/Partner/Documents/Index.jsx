import { Head, Link } from '@inertiajs/react';
import PartnerLayout from '@/Layouts/PartnerLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';

export default function Index({ documents }) {
    return (
        <PartnerLayout title="Mis documentos">
            <Head title="Mis documentos" />
            <PageHeader eyebrow="Privado" title="Mis documentos" />
            <DataTable rows={documents} columns={[
                { key: 'name', label: 'Documento' },
                { key: 'type', label: 'Tipo' },
                { key: 'status', label: 'Estado' },
                { key: 'actions', label: 'Acciones', render: (row) => <Link href={route('partner.documents.download', row.id)} className="text-rem-green">Descargar</Link> },
            ]} />
        </PartnerLayout>
    );
}
