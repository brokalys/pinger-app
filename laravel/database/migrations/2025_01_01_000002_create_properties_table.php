<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->nullable()->index();
            $table->string('source')->default('manual');
            $table->string('property_type');
            $table->string('listing_type');
            $table->unsignedBigInteger('price')->nullable();
            $table->unsignedTinyInteger('bedrooms')->nullable();
            $table->unsignedInteger('area_m2')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('address')->nullable();
            $table->string('suburb')->nullable();
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->string('url')->nullable();
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_processed')->default(false);
            $table->timestamps();

            $table->index(['latitude', 'longitude']);
            $table->index(['property_type', 'listing_type']);
            $table->index('is_processed');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
