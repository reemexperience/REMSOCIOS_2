<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestmentRequest;
use App\Http\Requests\UpdateInvestmentRequest;
use App\Models\Document;
use App\Models\Investment;
use App\Models\InvestorProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminInvestmentController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Investment::query()->with('investorProfile.user')->latest('investment_date');

        if ($status = $request->string('status')->toString()) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Investments/Index', [
            'investments' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only('status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Investments/Create', [
            'investors' => InvestorProfile::with('user')->get(),
            'documents' => Document::latest()->get(),
            'options' => [
                'statuses' => ['pending', 'active', 'paused', 'completed', 'cancelled'],
                'returnTypes' => ['economic', 'hybrid', 'products_services', 'custom'],
            ],
        ]);
    }

    public function store(StoreInvestmentRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $investment = new Investment($data);
        $investment->available_amount = $data['available_amount'] ?? null;
        $investment->calculateReturns();
        $investment->save();

        return redirect()->route('admin.investments.show', $investment)->with('success', 'Inversión creada correctamente.');
    }

    public function show(Investment $investment): Response
    {
        $investment->load(['investorProfile.user', 'redemptionRequests', 'contractDocument']);

        return Inertia::render('Admin/Investments/Show', [
            'investment' => $investment,
        ]);
    }

    public function edit(Investment $investment): Response
    {
        return Inertia::render('Admin/Investments/Edit', [
            'investment' => $investment,
            'investors' => InvestorProfile::with('user')->get(),
            'documents' => Document::latest()->get(),
            'options' => [
                'statuses' => ['pending', 'active', 'paused', 'completed', 'cancelled'],
                'returnTypes' => ['economic', 'hybrid', 'products_services', 'custom'],
            ],
        ]);
    }

    public function update(UpdateInvestmentRequest $request, Investment $investment): RedirectResponse
    {
        $data = $request->validated();
        $investment->fill($data);
        $investment->available_amount = $data['available_amount'] ?? $investment->available_amount;
        $investment->calculateReturns();
        $investment->save();

        return redirect()->route('admin.investments.show', $investment)->with('success', 'Inversión actualizada correctamente.');
    }

    public function destroy(Request $request, Investment $investment): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin'), 403);

        $investment->delete();

        return redirect()->route('admin.investments.index')->with('success', 'Inversión eliminada correctamente.');
    }
}
