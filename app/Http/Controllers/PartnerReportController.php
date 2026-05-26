<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Inertia\Inertia;
use Inertia\Response;

class PartnerReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Partner/Reports/Index', [
            'reports' => Report::where('status', 'published')
                ->where('visibility', 'all_partners')
                ->latest('published_at')
                ->paginate(10),
        ]);
    }

    public function show(Report $report): Response
    {
        abort_unless($report->status === 'published' && $report->visibility === 'all_partners', 403);

        return Inertia::render('Partner/Reports/Show', [
            'report' => $report,
        ]);
    }
}
