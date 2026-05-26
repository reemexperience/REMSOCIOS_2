<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminRoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Roles/Index', [
            'roles' => Role::query()
                ->withCount(['users', 'permissions'])
                ->with('permissions:id,name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Settings/Roles/Create', [
            'permissions' => Permission::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $role = Role::create(['name' => $data['name']]);
        $role->syncPermissions($data['permission_names'] ?? []);

        return redirect()->route('admin.settings.roles.show', $role)->with('success', 'Rol creado correctamente.');
    }

    public function show(Role $role): Response
    {
        $role->load(['permissions:id,name', 'users:id,name,email']);

        return Inertia::render('Admin/Settings/Roles/Show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role): Response
    {
        $role->load('permissions:id,name');

        return Inertia::render('Admin/Settings/Roles/Edit', [
            'role' => $role,
            'permissions' => Permission::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $data = $request->validated();

        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permission_names'] ?? []);

        return redirect()->route('admin.settings.roles.show', $role)->with('success', 'Rol actualizado correctamente.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        abort_if($role->name === 'Super Admin', 422, 'No puedes eliminar el rol Super Admin.');

        $role->delete();

        return redirect()->route('admin.settings.roles.index')->with('success', 'Rol eliminado correctamente.');
    }
}
