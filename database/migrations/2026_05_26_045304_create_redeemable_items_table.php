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
        Schema::create('redeemable_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type', 60);
            $table->string('category', 120);
            $table->text('description')->nullable();
            $table->decimal('value', 15, 2);
            $table->integer('stock')->default(0);
            $table->string('image_path')->nullable();
            $table->string('status', 40)->default('active');
            $table->boolean('visible_to_partners')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('redeemable_items');
    }
};
