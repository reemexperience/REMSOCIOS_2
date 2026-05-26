<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRedeemableItemRequest;
use App\Http\Requests\UpdateRedeemableItemRequest;
use App\Models\RedeemableItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminRedeemableItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/RedeemableItems/Index', [
            'items' => RedeemableItem::latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/RedeemableItems/Create', [
            'options' => $this->options(),
        ]);
    }

    public function store(StoreRedeemableItemRequest $request): RedirectResponse
    {
        $data = $request->validated();

        RedeemableItem::create([
            'name' => $data['name'],
            'type' => $data['type'],
            'category' => $data['category'],
            'description' => $data['description'] ?? null,
            'value' => $data['value'],
            'stock' => $data['stock'],
            'image_path' => $request->file('image_file')?->store('private/redeemable-items', 'local'),
            'status' => $data['status'],
            'visible_to_partners' => (bool) ($data['visible_to_partners'] ?? false),
        ]);

        return redirect()->route('admin.redeemable-items.index')->with('success', 'Ítem redimible creado correctamente.');
    }

    public function edit(RedeemableItem $item): Response
    {
        return Inertia::render('Admin/RedeemableItems/Edit', [
            'item' => $item,
            'options' => $this->options(),
        ]);
    }

    public function update(UpdateRedeemableItemRequest $request, RedeemableItem $item): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image_file')) {
            if ($item->image_path) {
                Storage::disk('local')->delete($item->image_path);
            }

            $item->image_path = $request->file('image_file')->store('private/redeemable-items', 'local');
        }

        $item->fill([
            'name' => $data['name'],
            'type' => $data['type'],
            'category' => $data['category'],
            'description' => $data['description'] ?? null,
            'value' => $data['value'],
            'stock' => $data['stock'],
            'status' => $data['status'],
            'visible_to_partners' => (bool) ($data['visible_to_partners'] ?? false),
        ])->save();

        return redirect()->route('admin.redeemable-items.index')->with('success', 'Ítem redimible actualizado correctamente.');
    }

    public function destroy(Request $request, RedeemableItem $item): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Admin') || $request->user()->can('manage redeemable items'), 403);

        if ($item->image_path) {
            Storage::disk('local')->delete($item->image_path);
        }

        $item->delete();

        return redirect()->route('admin.redeemable-items.index')->with('success', 'Ítem redimible eliminado correctamente.');
    }

    protected function options(): array
    {
        return [
            'types' => ['product', 'service', 'experience', 'discount', 'ticket', 'booking', 'formation', 'travel'],
            'statuses' => ['active', 'inactive', 'out_of_stock', 'hidden'],
        ];
    }
}
