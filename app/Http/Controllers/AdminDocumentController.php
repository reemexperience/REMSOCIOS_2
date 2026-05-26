<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Models\Document;
use App\Models\Investment;
use App\Models\InvestorProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminDocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Document::query()->with(['investorProfile.user', 'investment'])->latest();

        if ($type = $request->string('type')->toString()) {
            $query->where('type', $type);
        }

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only('type'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Documents/Create', [
            'investors' => InvestorProfile::with('user')->get(),
            'investments' => Investment::with('investorProfile.user')->get(),
            'options' => [
                'types' => ['contract', 'participation_certificate', 'return_agreement', 'investment_receipt', 'redemption_receipt', 'legal_annex', 'other'],
                'statuses' => ['active', 'archived', 'pending_signature', 'signed'],
            ],
        ]);
    }

    public function store(StoreDocumentRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $document = Document::create([
            'investor_profile_id' => $data['investor_profile_id'],
            'investment_id' => $data['investment_id'] ?? null,
            'name' => $data['name'],
            'type' => $data['type'],
            'file_path' => $request->file('document_file')->store('private/documents', 'local'),
            'status' => $data['status'],
            'visible_to_partner' => (bool) ($data['visible_to_partner'] ?? false),
            'uploaded_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.documents.show', $document)->with('success', 'Documento creado correctamente.');
    }

    public function show(Document $document): Response
    {
        $document->load(['investorProfile.user', 'investment', 'uploader']);

        return Inertia::render('Admin/Documents/Show', [
            'document' => $document,
        ]);
    }

    public function download(Document $document)
    {
        abort_unless(Storage::disk('local')->exists($document->file_path), 404);

        return Storage::disk('local')->download($document->file_path, $this->downloadName($document));
    }

    public function destroy(Request $request, Document $document): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin') || $request->user()->can('manage documents'), 403);

        if ($document->file_path) {
            Storage::disk('local')->delete($document->file_path);
        }
        $document->delete();

        return redirect()->route('admin.documents.index')->with('success', 'Documento eliminado correctamente.');
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
