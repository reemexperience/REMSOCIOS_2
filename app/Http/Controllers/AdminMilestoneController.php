<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMilestoneRequest;
use App\Http\Requests\UpdateMilestoneRequest;
use App\Models\Milestone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminMilestoneController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Milestones/Index', [
            'milestones' => Milestone::latest('date')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Milestones/Create', ['options' => $this->options()]);
    }

    public function store(StoreMilestoneRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Milestone::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'category' => $data['category'],
            'progress_percentage' => $data['progress_percentage'],
            'status' => $data['status'],
            'media_path' => $request->file('media_file')?->store('private/milestones', 'local'),
            'visible_to_partners' => (bool) ($data['visible_to_partners'] ?? false),
            'date' => $data['date'] ?? null,
        ]);

        return redirect()->route('admin.milestones.index')->with('success', 'Hito creado correctamente.');
    }

    public function edit(Milestone $milestone): Response
    {
        return Inertia::render('Admin/Milestones/Edit', [
            'milestone' => $milestone,
            'options' => $this->options(),
        ]);
    }

    public function update(UpdateMilestoneRequest $request, Milestone $milestone): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('media_file')) {
            if ($milestone->media_path) {
                Storage::disk('local')->delete($milestone->media_path);
            }
            $milestone->media_path = $request->file('media_file')->store('private/milestones', 'local');
        }

        $milestone->fill([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'category' => $data['category'],
            'progress_percentage' => $data['progress_percentage'],
            'status' => $data['status'],
            'visible_to_partners' => (bool) ($data['visible_to_partners'] ?? false),
            'date' => $data['date'] ?? null,
        ])->save();

        return redirect()->route('admin.milestones.index')->with('success', 'Hito actualizado correctamente.');
    }

    public function destroy(Request $request, Milestone $milestone): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin') || $request->user()->can('manage milestones'), 403);

        if ($milestone->media_path) {
            Storage::disk('local')->delete($milestone->media_path);
        }
        $milestone->delete();

        return redirect()->route('admin.milestones.index')->with('success', 'Hito eliminado correctamente.');
    }

    protected function options(): array
    {
        return [
            'statuses' => ['planned', 'in_progress', 'completed', 'delayed', 'cancelled'],
            'categories' => ['REM Store', 'REM Music', 'REM Educativo', 'REM Experience', 'REM Social', 'Gira Angelo RM', 'Plataforma Web', 'Marketing', 'Infraestructura', 'Alianzas', 'Ventas', 'Eventos'],
        ];
    }
}
