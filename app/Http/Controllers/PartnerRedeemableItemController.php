<?php

namespace App\Http\Controllers;

use App\Models\RedeemableItem;
use Inertia\Inertia;
use Inertia\Response;

class PartnerRedeemableItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Partner/RedeemableItems', [
            'items' => RedeemableItem::where('visible_to_partners', true)
                ->where('status', 'active')
                ->latest()
                ->paginate(12),
        ]);
    }
}
