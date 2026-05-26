<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->with(['roles', 'permissions', 'investorProfile'])->latest();

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role = $request->string('role')->toString()) {
            $query->role($role);
        }

        return Inertia::render('Admin/Settings/Users/Index', [
            'users' => $query->paginate(12)->withQueryString(),
            'roles' => Role::query()->orderBy('name')->get(['id', 'name']),
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Settings/Users/Create', [
            'roles' => Role::query()->orderBy('name')->get(['id', 'name']),
            'permissions' => Permission::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verified_at' => $data['email_verified_at'] ?? now(),
        ]);

        $user->syncRoles($data['role_names']);
        $user->syncPermissions($data['direct_permissions'] ?? []);

        return redirect()->route('admin.settings.users.show', $user)->with('success', 'Usuario creado correctamente.');
    }

    public function show(User $user): Response
    {
        $user->load(['roles', 'permissions', 'investorProfile', 'investorProfile.investments']);

        return Inertia::render('Admin/Settings/Users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user): Response
    {
        $user->load(['roles', 'permissions']);

        return Inertia::render('Admin/Settings/Users/Edit', [
            'user' => $user,
            'roles' => Role::query()->orderBy('name')->get(['id', 'name']),
            'permissions' => Permission::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
            'email_verified_at' => $data['email_verified_at'] ?? $user->email_verified_at,
        ];

        if (!empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }

        $user->update($payload);
        $user->syncRoles($data['role_names']);
        $user->syncPermissions($data['direct_permissions'] ?? []);

        return redirect()->route('admin.settings.users.show', $user)->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        abort_if($user->id === $request->user()->id, 422, 'No puedes eliminar tu propio usuario.');

        $user->syncRoles([]);
        $user->syncPermissions([]);
        $user->delete();

        return redirect()->route('admin.settings.users.index')->with('success', 'Usuario eliminado correctamente.');
    }
}
