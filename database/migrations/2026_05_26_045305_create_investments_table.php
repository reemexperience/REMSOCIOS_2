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
        Schema::create('investments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('investor_profile_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 15, 2);
            $table->string('currency', 10)->default('COP');
            $table->date('investment_date');
            $table->decimal('return_min_percentage', 5, 2)->default(30);
            $table->decimal('return_max_percentage', 5, 2)->default(80);
            $table->decimal('projected_min_return', 15, 2);
            $table->decimal('projected_max_return', 15, 2);
            $table->decimal('redeemed_amount', 15, 2)->default(0);
            $table->decimal('available_amount', 15, 2)->default(0);
            $table->string('return_type', 40)->default('economic');
            $table->string('status', 40)->default('pending');
            $table->unsignedBigInteger('contract_document_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investments');
    }
};
