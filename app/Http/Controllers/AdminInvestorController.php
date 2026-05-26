<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestorRequest;
use App\Http\Requests\UpdateInvestorRequest;
use App\Models\InvestorProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AdminInvestorController extends Controller
{
    public function index(Request $request): Response
    {
        $query = InvestorProfile::query()->with('user')->latest();

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder->where('document_number', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhereHas('user', fn ($userQuery) => $userQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%"));
            });
        }

        if ($status = $request->string('status')->toString()) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Investors/Index', [
            'investors' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Investors/Create', [
            'options' => [
                'types' => ['founder', 'strategic_partner', 'investor', 'ally', 'custom'],
                'statuses' => ['pending', 'active', 'paused', 'completed', 'cancelled'],
            ],
        ]);
    }

    public function store(StoreInvestorRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => isset($data['password']) && $data['password'] !== '' ? Hash::make($data['password']) : Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $user->assignRole('Socio');

        $profile = $user->investorProfile()->create(collect($data)->except(['name', 'email', 'password'])->all());

        return redirect()->route('admin.investors.show', $profile)->with('success', 'Socio creado correctamente.');
    }

    public function show(InvestorProfile $investor): Response
    {
        $investor->load(['user', 'investments', 'documents']);

        return Inertia::render('Admin/Investors/Show', [
            'investor' => $investor,
        ]);
    }

    public function edit(InvestorProfile $investor): Response
    {
        $investor->load('user');

        return Inertia::render('Admin/Investors/Edit', [
            'investor' => $investor,
            'options' => [
                'types' => ['founder', 'strategic_partner', 'investor', 'ally', 'custom'],
                'statuses' => ['pending', 'active', 'paused', 'completed', 'cancelled'],
            ],
        ]);
    }

    public function update(UpdateInvestorRequest $request, InvestorProfile $investor): RedirectResponse
    {
        $data = $request->validated();
        $investor->load('user');

        $investor->user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => isset($data['password']) && $data['password'] !== '' ? Hash::make($data['password']) : $investor->user->password,
        ]);

        $investor->update(collect($data)->except(['name', 'email', 'password'])->all());

        return redirect()->route('admin.investors.show', $investor)->with('success', 'Socio actualizado correctamente.');
    }

    public function destroy(Request $request, InvestorProfile $investor): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin'), 403);

        $user = $investor->user;
        $investor->delete();
        $user?->delete();

        return redirect()->route('admin.investors.index')->with('success', 'Socio eliminado correctamente.');
    }
}
