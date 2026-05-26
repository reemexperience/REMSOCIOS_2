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
        Schema::create('redemption_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('investment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('investor_profile_id')->constrained()->cascadeOnDelete();
            $table->decimal('requested_amount', 15, 2);
            $table->string('redemption_type', 40)->default('cash');
            $table->decimal('cash_amount', 15, 2)->default(0);
            $table->decimal('products_amount', 15, 2)->default(0);
            $table->decimal('services_amount', 15, 2)->default(0);
            $table->decimal('experiences_amount', 15, 2)->default(0);
            $table->string('status', 40)->default('pending');
            $table->text('partner_notes')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('requested_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('redemption_requests');
    }
};
