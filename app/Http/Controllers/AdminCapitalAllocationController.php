<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCapitalAllocationRequest;
use App\Models\CapitalAllocation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminCapitalAllocationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/CapitalAllocations/Index', [
            'allocations' => CapitalAllocation::latest()->get(),
            'statuses' => ['planned', 'active', 'completed', 'paused'],
        ]);
    }

    public function store(StoreCapitalAllocationRequest $request): RedirectResponse
    {
        CapitalAllocation::create($request->validated());

        return back()->with('success', 'Asignación de capital creada correctamente.');
    }

    public function update(StoreCapitalAllocationRequest $request, CapitalAllocation $capitalAllocation): RedirectResponse
    {
        $capitalAllocation->update($request->validated());

        return back()->with('success', 'Asignación de capital actualizada correctamente.');
    }

    public function destroy(CapitalAllocation $capitalAllocation): RedirectResponse
    {
        $capitalAllocation->delete();

        return back()->with('success', 'Asignación de capital eliminada correctamente.');
    }
}
