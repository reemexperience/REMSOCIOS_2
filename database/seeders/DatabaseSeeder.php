<?php

namespace Database\Seeders;

use App\Models\CapitalAllocation;
use App\Models\Document;
use App\Models\Investment;
use App\Models\InvestorProfile;
use App\Models\Milestone;
use App\Models\RedeemableItem;
use App\Models\Report;
use App\Models\SystemSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage users',
            'manage roles',
            'manage investors',
            'manage investments',
            'manage redemptions',
            'manage reports',
            'manage documents',
            'manage milestones',
            'manage redeemable items',
            'manage capital allocations',
            'view own dashboard',
            'view own investments',
            'view own redemptions',
            'view own documents',
            'view own reports',
            'request redemption',
            'approve redemptions',
            'reject redemptions',
            'complete redemptions',
            'view admin dashboard',
            'view finance dashboard',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        SystemSetting::putValue('partner_invitation_expiration_hours', 3);

        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdminRole->syncPermissions(Permission::all());

        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->syncPermissions([
            'manage investors',
            'manage investments',
            'manage redemptions',
            'manage reports',
            'manage documents',
            'manage milestones',
            'manage redeemable items',
            'manage capital allocations',
            'view admin dashboard',
        ]);

        $partnerRole = Role::firstOrCreate(['name' => 'Socio']);
        $partnerRole->syncPermissions([
            'view own dashboard',
            'view own investments',
            'view own redemptions',
            'view own documents',
            'view own reports',
            'request redemption',
        ]);

        $financeRole = Role::firstOrCreate(['name' => 'Finanzas']);
        $financeRole->syncPermissions([
            'manage investments',
            'manage redemptions',
            'manage reports',
            'approve redemptions',
            'reject redemptions',
            'complete redemptions',
            'view admin dashboard',
            'view finance dashboard',
        ]);

        $operatorRole = Role::firstOrCreate(['name' => 'Operador REM']);
        $operatorRole->syncPermissions([
            'manage reports',
            'manage milestones',
            'manage redeemable items',
            'view admin dashboard',
        ]);

        $users = [
            ['name' => 'Super Admin REM', 'email' => 'admin@rem.test', 'role' => 'Super Admin'],
            ['name' => 'Admin REM', 'email' => 'adminrem@rem.test', 'role' => 'Admin'],
            ['name' => 'Finanzas REM', 'email' => 'finanzas@rem.test', 'role' => 'Finanzas'],
            ['name' => 'Aliado Fundador Demo', 'email' => 'socio@rem.test', 'role' => 'Socio'],
        ];

        $createdUsers = collect($users)->mapWithKeys(function (array $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );

            $user->syncRoles([$data['role']]);

            return [$data['email'] => $user];
        });

        $partnerUser = $createdUsers['socio@rem.test'];

        $profile = InvestorProfile::updateOrCreate(
            ['user_id' => $partnerUser->id],
            [
                'document_type' => 'cc',
                'document_number' => '100000001',
                'phone' => '+57 300 000 0000',
                'city' => 'Cartagena',
                'country' => 'Colombia',
                'investor_type' => 'founder',
                'status' => 'active',
                'joined_at' => Carbon::today(),
                'notes' => 'Aliado fundador demo de REM Partners.',
            ]
        );

        $investment = Investment::updateOrCreate(
            ['investor_profile_id' => $profile->id, 'amount' => 5000000],
            [
                'currency' => 'COP',
                'investment_date' => Carbon::today()->subDays(10),
                'return_min_percentage' => 30,
                'return_max_percentage' => 80,
                'projected_min_return' => 6500000,
                'projected_max_return' => 9000000,
                'redeemed_amount' => 0,
                'available_amount' => 6500000,
                'return_type' => 'hybrid',
                'status' => 'active',
                'notes' => 'Participación fundadora demo.',
            ]
        );

        $this->ensureDemoContractPdf();

        Document::updateOrCreate(
            ['investment_id' => $investment->id, 'type' => 'contract'],
            [
                'investor_profile_id' => $profile->id,
                'name' => 'Contrato REM Partners',
                'file_path' => 'private/contracts/rem-partners-demo.pdf',
                'status' => 'active',
                'visible_to_partner' => true,
                'uploaded_by' => $createdUsers['admin@rem.test']->id,
            ]
        );

        foreach ([
            ['category' => 'Plataforma web', 'allocated_amount' => 8000000, 'spent_amount' => 4800000, 'percentage' => 16, 'status' => 'active'],
            ['category' => 'Merch inicial', 'allocated_amount' => 12000000, 'spent_amount' => 6000000, 'percentage' => 24, 'status' => 'active'],
            ['category' => 'Equipos e infraestructura', 'allocated_amount' => 10000000, 'spent_amount' => 3500000, 'percentage' => 20, 'status' => 'active'],
            ['category' => 'Marketing y contenido audiovisual', 'allocated_amount' => 7000000, 'spent_amount' => 2800000, 'percentage' => 14, 'status' => 'active'],
            ['category' => 'Gira Angelo RM', 'allocated_amount' => 13000000, 'spent_amount' => 4200000, 'percentage' => 26, 'status' => 'planned'],
        ] as $allocation) {
            CapitalAllocation::updateOrCreate(
                ['category' => $allocation['category']],
                $allocation + ['description' => 'Distribución inicial de capital REM.']
            );
        }

        foreach ([
            ['title' => 'Reporte inicial de capital', 'type' => 'financial'],
            ['title' => 'Avance REM Store', 'type' => 'rem_store'],
            ['title' => 'Avance REM Music', 'type' => 'rem_music'],
            ['title' => 'Uso inicial del capital', 'type' => 'capital_usage'],
            ['title' => 'Roadmap REM Universe', 'type' => 'project_progress'],
        ] as $index => $report) {
            Report::updateOrCreate(
                ['slug' => str($report['title'])->slug()->toString()],
                [
                    'title' => $report['title'],
                    'description' => 'Reporte demo para seguimiento transparente del ecosistema REM.',
                    'period' => '2026-Q2',
                    'type' => $report['type'],
                    'file_path' => null,
                    'image_path' => null,
                    'status' => 'published',
                    'visibility' => 'all_partners',
                    'published_at' => now()->subDays(14 - ($index * 2)),
                    'created_by' => $createdUsers['adminrem@rem.test']->id,
                ]
            );
        }

        foreach ([
            ['title' => 'Lanzamiento plataforma REM Partners', 'category' => 'Plataforma Web', 'progress_percentage' => 100, 'status' => 'completed'],
            ['title' => 'Activación REM Store', 'category' => 'REM Store', 'progress_percentage' => 72, 'status' => 'in_progress'],
            ['title' => 'Primer drop de merch', 'category' => 'REM Store', 'progress_percentage' => 61, 'status' => 'in_progress'],
            ['title' => 'Primer reporte financiero', 'category' => 'Marketing', 'progress_percentage' => 100, 'status' => 'completed'],
            ['title' => 'Avance de Gira Angelo RM', 'category' => 'Gira Angelo RM', 'progress_percentage' => 44, 'status' => 'in_progress'],
            ['title' => 'Desarrollo de eventos REM Experience', 'category' => 'REM Experience', 'progress_percentage' => 57, 'status' => 'in_progress'],
        ] as $index => $milestone) {
            Milestone::updateOrCreate(
                ['title' => $milestone['title']],
                $milestone + [
                    'description' => 'Hito operativo demo del ecosistema REM.',
                    'media_path' => null,
                    'visible_to_partners' => true,
                    'date' => now()->subDays($index * 5)->toDateString(),
                ]
            );
        }

        foreach ([
            ['name' => 'Camiseta Premium REM', 'type' => 'product', 'category' => 'Merch REM', 'value' => 180000],
            ['name' => 'Hoodie REM Universe', 'type' => 'product', 'category' => 'Merch REM', 'value' => 260000],
            ['name' => 'Entrada VIP evento REM', 'type' => 'ticket', 'category' => 'Entradas VIP', 'value' => 320000],
            ['name' => 'Sesión de formación DJ', 'type' => 'formation', 'category' => 'Formación', 'value' => 450000],
            ['name' => 'Booking DJ privado', 'type' => 'booking', 'category' => 'Booking de DJs', 'value' => 1500000],
            ['name' => 'Decoración evento REM', 'type' => 'service', 'category' => 'Decoración de eventos', 'value' => 850000],
            ['name' => 'Experiencia musical VIP', 'type' => 'experience', 'category' => 'Experiencias', 'value' => 1200000],
            ['name' => 'Descuento especial en merch', 'type' => 'discount', 'category' => 'Descuentos exclusivos', 'value' => 100000],
        ] as $item) {
            RedeemableItem::updateOrCreate(
                ['name' => $item['name']],
                $item + [
                    'description' => 'Beneficio demo disponible para socios REM.',
                    'stock' => 12,
                    'image_path' => null,
                    'status' => 'active',
                    'visible_to_partners' => true,
                ]
            );
        }
    }

    protected function ensureDemoContractPdf(): void
    {
        $path = 'private/contracts/rem-partners-demo.pdf';

        if (Storage::disk('local')->exists($path)) {
            return;
        }

        Storage::disk('local')->put($path, $this->demoPdfContent());
    }

    protected function demoPdfContent(): string
    {
        return <<<'PDF'
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 230 >>
stream
BT
/F1 22 Tf
60 760 Td
(REM Partners - Documento Demo) Tj
0 -40 Td
/F1 14 Tf
(Contrato de prueba generado por el seeder.) Tj
0 -24 Td
(Este PDF existe para validar la descarga privada.) Tj
0 -24 Td
(Socio demo: Aliado Fundador Demo) Tj
0 -24 Td
(Estado: Activo) Tj
0 -24 Td
(Proyecto: REM Universe) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000241 00000 n 
0000000522 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
592
%%EOF
PDF;
    }
}
