import MobileNav from '@/Components/MobileNav';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function PartnerLayout({ children, title = 'Panel del socio' }) {
    return (
        <div className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
            <div className="mx-auto flex max-w-7xl gap-6">
                <Sidebar variant="partner" />
                <div className="flex-1 space-y-6 pb-24 lg:pb-0">
                    <Topbar title={title} />
                    {children}
                </div>
            </div>
            <MobileNav />
        </div>
    );
}
