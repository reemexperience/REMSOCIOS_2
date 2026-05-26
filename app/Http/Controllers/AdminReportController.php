<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Report::query()->with('creator')->latest('published_at');

        if ($status = $request->string('status')->toString()) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only('status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Reports/Create', ['options' => $this->options()]);
    }

    public function store(StoreReportRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $report = Report::create([
            'title' => $data['title'],
            'slug' => Str::slug($data['title']).'-'.Str::lower(Str::random(5)),
            'description' => $data['description'] ?? null,
            'period' => $data['period'] ?? null,
            'type' => $data['type'],
            'file_path' => $request->file('report_file')?->store('private/reports', 'local'),
            'image_path' => $request->file('image_file')?->store('private/report-images', 'local'),
            'status' => $data['status'],
            'visibility' => $data['visibility'],
            'published_at' => $data['published_at'] ?? null,
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.reports.show', $report)->with('success', 'Reporte creado correctamente.');
    }

    public function show(Report $report): Response
    {
        $report->load('creator');

        return Inertia::render('Admin/Reports/Show', ['report' => $report]);
    }

    public function edit(Report $report): Response
    {
        return Inertia::render('Admin/Reports/Edit', [
            'report' => $report,
            'options' => $this->options(),
        ]);
    }

    public function update(UpdateReportRequest $request, Report $report): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('report_file')) {
            if ($report->file_path) {
                Storage::disk('local')->delete($report->file_path);
            }
            $report->file_path = $request->file('report_file')->store('private/reports', 'local');
        }

        if ($request->hasFile('image_file')) {
            if ($report->image_path) {
                Storage::disk('local')->delete($report->image_path);
            }
            $report->image_path = $request->file('image_file')->store('private/report-images', 'local');
        }

        $report->fill([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'period' => $data['period'] ?? null,
            'type' => $data['type'],
            'status' => $data['status'],
            'visibility' => $data['visibility'],
            'published_at' => $data['published_at'] ?? null,
        ])->save();

        return redirect()->route('admin.reports.show', $report)->with('success', 'Reporte actualizado correctamente.');
    }

    public function destroy(Request $request, Report $report): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin') || $request->user()->can('manage reports'), 403);

        if ($report->file_path) {
            Storage::disk('local')->delete($report->file_path);
        }
        if ($report->image_path) {
            Storage::disk('local')->delete($report->image_path);
        }
        $report->delete();

        return redirect()->route('admin.reports.index')->with('success', 'Reporte eliminado correctamente.');
    }

    protected function options(): array
    {
        return [
            'types' => ['financial', 'project_progress', 'capital_usage', 'sales', 'events', 'rem_store', 'rem_music', 'rem_educativo', 'rem_experience', 'rem_social', 'gira_angelo_rm'],
            'statuses' => ['draft', 'published', 'archived'],
            'visibilities' => ['all_partners', 'admins_only', 'specific_partners'],
        ];
    }
}
