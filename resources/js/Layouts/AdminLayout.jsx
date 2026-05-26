import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function AdminLayout({ children, title = 'Panel administrativo' }) {
    return (
        <div className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
            <div className="mx-auto flex max-w-7xl gap-6">
                <Sidebar variant="admin" />
                <div className="flex-1 space-y-6">
                    <Topbar title={title} />
                    {children}
                </div>
            </div>
        </div>
    );
}
