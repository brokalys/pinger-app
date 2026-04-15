<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pingers', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('property_type');
            $table->string('listing_type');
            $table->unsignedBigInteger('price_min')->nullable();
            $table->unsignedBigInteger('price_max')->nullable();
            $table->unsignedTinyInteger('bedrooms_min')->nullable();
            $table->unsignedTinyInteger('bedrooms_max')->nullable();
            $table->unsignedInteger('area_m2_min')->nullable();
            $table->unsignedInteger('area_m2_max')->nullable();
            $table->text('polygon');
            $table->string('frequency')->default('weekly');
            $table->boolean('is_confirmed')->default(false);
            $table->string('confirm_token', 64)->unique();
            $table->string('unsubscribe_token', 64)->unique();
            $table->timestamp('last_notified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('email');
            $table->index('is_confirmed');
            $table->index('frequency');
            $table->index('last_notified_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pingers');
    }
};
