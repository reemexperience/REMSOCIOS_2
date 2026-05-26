<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('redemption_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('redemption_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('redeemable_item_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('type', 60);
            $table->decimal('value', 15, 2)->default(0);
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('total', 15, 2)->default(0);
            $table->string('status', 40)->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('redemption_items');
    }
};
