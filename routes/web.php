<?php

use App\Http\Controllers\AdminCapitalAllocationController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminDocumentController;
use App\Http\Controllers\AdminInvestmentController;
use App\Http\Controllers\AdminInvestorInvitationController;
use App\Http\Controllers\AdminInvestorController;
use App\Http\Controllers\AdminInvitationSettingController;
use App\Http\Controllers\AdminMilestoneController;
use App\Http\Controllers\AdminPermissionController;
use App\Http\Controllers\AdminRedeemableItemController;
use App\Http\Controllers\AdminRedemptionController;
use App\Http\Controllers\AdminReportController;
use App\Http\Controllers\AdminRoleController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\PartnerDashboardController;
use App\Http\Controllers\PartnerDocumentController;
use App\Http\Controllers\PartnerInvestmentController;
use App\Http\Controllers\PartnerMilestoneController;
use App\Http\Controllers\PartnerRedeemableItemController;
use App\Http\Controllers\PartnerRedemptionController;
use App\Http\Controllers\PartnerReportController;
use App\Http\Controllers\PublicInvestorOnboardingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false,
    ]);
})->name('home');

Route::get('/join/partner/{token}', [PublicInvestorOnboardingController::class, 'show'])->name('partner.onboarding.show');
Route::post('/join/partner/{token}', [PublicInvestorOnboardingController::class, 'store'])->name('partner.onboarding.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', PartnerDashboardController::class)->name('dashboard');
    Route::get('/my-investment', [PartnerInvestmentController::class, 'show'])->name('partner.investment.show');
    Route::get('/my-redemptions', [PartnerRedemptionController::class, 'index'])->name('partner.redemptions.index');
    Route::get('/my-redemptions/create', [PartnerRedemptionController::class, 'create'])->name('partner.redemptions.create');
    Route::post('/my-redemptions', [PartnerRedemptionController::class, 'store'])->name('partner.redemptions.store');
    Route::get('/my-redemptions/{redemptionRequest}', [PartnerRedemptionController::class, 'show'])->name('partner.redemptions.show');
    Route::get('/my-documents', [PartnerDocumentController::class, 'index'])->name('partner.documents.index');
    Route::get('/my-documents/{document}/download', [PartnerDocumentController::class, 'download'])->name('partner.documents.download');
    Route::get('/my-reports', [PartnerReportController::class, 'index'])->name('partner.reports.index');
    Route::get('/my-reports/{report}', [PartnerReportController::class, 'show'])->name('partner.reports.show');
    Route::get('/milestones', [PartnerMilestoneController::class, 'index'])->name('partner.milestones.index');
    Route::get('/redeemable-items', [PartnerRedeemableItemController::class, 'index'])->name('partner.redeemable-items.index');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:Super Admin|Admin|Finanzas|Operador REM'])
    ->group(function () {
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/investors', [AdminInvestorController::class, 'index'])->name('investors.index');
        Route::get('/investor-invitations', [AdminInvestorInvitationController::class, 'index'])->name('investor-invitations.index');
        Route::post('/investor-invitations/email', [AdminInvestorInvitationController::class, 'storeEmail'])->name('investor-invitations.email');
        Route::post('/investor-invitations/public', [AdminInvestorInvitationController::class, 'storePublic'])->name('investor-invitations.public');
        Route::get('/investors/create', [AdminInvestorController::class, 'create'])->name('investors.create');
        Route::post('/investors', [AdminInvestorController::class, 'store'])->name('investors.store');
        Route::get('/investors/{investor}', [AdminInvestorController::class, 'show'])->name('investors.show');
        Route::get('/investors/{investor}/edit', [AdminInvestorController::class, 'edit'])->name('investors.edit');
        Route::put('/investors/{investor}', [AdminInvestorController::class, 'update'])->name('investors.update');
        Route::delete('/investors/{investor}', [AdminInvestorController::class, 'destroy'])->name('investors.destroy');

        Route::get('/investments', [AdminInvestmentController::class, 'index'])->name('investments.index');
        Route::get('/investments/create', [AdminInvestmentController::class, 'create'])->name('investments.create');
        Route::post('/investments', [AdminInvestmentController::class, 'store'])->name('investments.store');
        Route::get('/investments/{investment}', [AdminInvestmentController::class, 'show'])->name('investments.show');
        Route::get('/investments/{investment}/edit', [AdminInvestmentController::class, 'edit'])->name('investments.edit');
        Route::put('/investments/{investment}', [AdminInvestmentController::class, 'update'])->name('investments.update');
        Route::delete('/investments/{investment}', [AdminInvestmentController::class, 'destroy'])->name('investments.destroy');

        Route::get('/redemptions', [AdminRedemptionController::class, 'index'])->name('redemptions.index');
        Route::get('/redemptions/{redemptionRequest}', [AdminRedemptionController::class, 'show'])->name('redemptions.show');
        Route::patch('/redemptions/{redemptionRequest}/under-review', [AdminRedemptionController::class, 'underReview'])->name('redemptions.under-review');
        Route::patch('/redemptions/{redemptionRequest}/approve', [AdminRedemptionController::class, 'approve'])->name('redemptions.approve');
        Route::patch('/redemptions/{redemptionRequest}/reject', [AdminRedemptionController::class, 'reject'])->name('redemptions.reject');
        Route::patch('/redemptions/{redemptionRequest}/complete', [AdminRedemptionController::class, 'complete'])->name('redemptions.complete');
        Route::patch('/redemptions/{redemptionRequest}/cancel', [AdminRedemptionController::class, 'cancel'])->name('redemptions.cancel');

        Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/create', [AdminReportController::class, 'create'])->name('reports.create');
        Route::post('/reports', [AdminReportController::class, 'store'])->name('reports.store');
        Route::get('/reports/{report}', [AdminReportController::class, 'show'])->name('reports.show');
        Route::get('/reports/{report}/edit', [AdminReportController::class, 'edit'])->name('reports.edit');
        Route::put('/reports/{report}', [AdminReportController::class, 'update'])->name('reports.update');
        Route::delete('/reports/{report}', [AdminReportController::class, 'destroy'])->name('reports.destroy');

        Route::get('/documents', [AdminDocumentController::class, 'index'])->name('documents.index');
        Route::get('/documents/create', [AdminDocumentController::class, 'create'])->name('documents.create');
        Route::post('/documents', [AdminDocumentController::class, 'store'])->name('documents.store');
        Route::get('/documents/{document}', [AdminDocumentController::class, 'show'])->name('documents.show');
        Route::get('/documents/{document}/download', [AdminDocumentController::class, 'download'])->name('documents.download');
        Route::delete('/documents/{document}', [AdminDocumentController::class, 'destroy'])->name('documents.destroy');

        Route::get('/milestones', [AdminMilestoneController::class, 'index'])->name('milestones.index');
        Route::get('/milestones/create', [AdminMilestoneController::class, 'create'])->name('milestones.create');
        Route::post('/milestones', [AdminMilestoneController::class, 'store'])->name('milestones.store');
        Route::get('/milestones/{milestone}/edit', [AdminMilestoneController::class, 'edit'])->name('milestones.edit');
        Route::put('/milestones/{milestone}', [AdminMilestoneController::class, 'update'])->name('milestones.update');
        Route::delete('/milestones/{milestone}', [AdminMilestoneController::class, 'destroy'])->name('milestones.destroy');

        Route::get('/redeemable-items', [AdminRedeemableItemController::class, 'index'])->name('redeemable-items.index');
        Route::get('/redeemable-items/create', [AdminRedeemableItemController::class, 'create'])->name('redeemable-items.create');
        Route::post('/redeemable-items', [AdminRedeemableItemController::class, 'store'])->name('redeemable-items.store');
        Route::get('/redeemable-items/{item}/edit', [AdminRedeemableItemController::class, 'edit'])->name('redeemable-items.edit');
        Route::put('/redeemable-items/{item}', [AdminRedeemableItemController::class, 'update'])->name('redeemable-items.update');
        Route::delete('/redeemable-items/{item}', [AdminRedeemableItemController::class, 'destroy'])->name('redeemable-items.destroy');

        Route::get('/capital-allocations', [AdminCapitalAllocationController::class, 'index'])->name('capital-allocations.index');
        Route::post('/capital-allocations', [AdminCapitalAllocationController::class, 'store'])->name('capital-allocations.store');
        Route::put('/capital-allocations/{capitalAllocation}', [AdminCapitalAllocationController::class, 'update'])->name('capital-allocations.update');
        Route::delete('/capital-allocations/{capitalAllocation}', [AdminCapitalAllocationController::class, 'destroy'])->name('capital-allocations.destroy');
    });

Route::prefix('admin/settings')
    ->name('admin.settings.')
    ->middleware(['auth', 'verified', 'role:Super Admin'])
    ->group(function () {
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

        Route::get('/roles', [AdminRoleController::class, 'index'])->name('roles.index');
        Route::get('/roles/create', [AdminRoleController::class, 'create'])->name('roles.create');
        Route::post('/roles', [AdminRoleController::class, 'store'])->name('roles.store');
        Route::get('/roles/{role}', [AdminRoleController::class, 'show'])->name('roles.show');
        Route::get('/roles/{role}/edit', [AdminRoleController::class, 'edit'])->name('roles.edit');
        Route::put('/roles/{role}', [AdminRoleController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [AdminRoleController::class, 'destroy'])->name('roles.destroy');

        Route::get('/permissions', [AdminPermissionController::class, 'index'])->name('permissions.index');
        Route::get('/permissions/create', [AdminPermissionController::class, 'create'])->name('permissions.create');
        Route::post('/permissions', [AdminPermissionController::class, 'store'])->name('permissions.store');
        Route::get('/permissions/{permission}/edit', [AdminPermissionController::class, 'edit'])->name('permissions.edit');
        Route::put('/permissions/{permission}', [AdminPermissionController::class, 'update'])->name('permissions.update');
        Route::delete('/permissions/{permission}', [AdminPermissionController::class, 'destroy'])->name('permissions.destroy');

        Route::get('/invitation-settings', [AdminInvitationSettingController::class, 'edit'])->name('invitation-settings.edit');
        Route::put('/invitation-settings', [AdminInvitationSettingController::class, 'update'])->name('invitation-settings.update');
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
