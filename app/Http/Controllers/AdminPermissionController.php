<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class AdminPermissionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Permissions/Index', [
            'permissions' => Permission::query()
                ->withCount('roles')
                ->orderBy('name')
                ->paginate(20),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Settings/Permissions/Create');
    }

    public function store(StorePermissionRequest $request): RedirectResponse
    {
        $permission = Permission::create(['name' => $request->validated('name')]);

        return redirect()->route('admin.settings.permissions.edit', $permission)->with('success', 'Permiso creado correctamente.');
    }

    public function edit(Permission $permission): Response
    {
        $permission->load('roles:id,name');

        return Inertia::render('Admin/Settings/Permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        $permission->update(['name' => $request->validated('name')]);

        return redirect()->route('admin.settings.permissions.index')->with('success', 'Permiso actualizado correctamente.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()->route('admin.settings.permissions.index')->with('success', 'Permiso eliminado correctamente.');
    }
}
