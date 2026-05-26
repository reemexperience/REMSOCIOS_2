<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use Inertia\Inertia;
use Inertia\Response;

class PartnerMilestoneController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Partner/Milestones', [
            'milestones' => Milestone::where('visible_to_partners', true)
                ->latest('date')
                ->paginate(12),
        ]);
    }
}
