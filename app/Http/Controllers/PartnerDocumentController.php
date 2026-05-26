<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PartnerDocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = $request->user()->investorProfile()->firstOrFail();

        return Inertia::render('Partner/Documents/Index', [
            'documents' => Document::where('investor_profile_id', $profile->id)
                ->where('visible_to_partner', true)
                ->latest()
                ->get(),
        ]);
    }

    public function download(Request $request, Document $document)
    {
        abort_unless($document->investorProfile?->user_id === $request->user()->id && $document->visible_to_partner, 403);
        abort_unless(Storage::disk('local')->exists($document->file_path), 404);

        return Storage::disk('local')->download($document->file_path, $this->downloadName($document));
    }

    protected function downloadName(Document $document): string
    {
        $extension = pathinfo($document->file_path, PATHINFO_EXTENSION);

        if ($extension !== '' && ! str_ends_with(strtolower($document->name), '.'.strtolower($extension))) {
            return $document->name.'.'.$extension;
        }

        return $document->name;
    }
}
