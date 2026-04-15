<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pinger_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pinger_id')->constrained()->cascadeOnDelete();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();

            $table->unique(['pinger_id', 'property_id']);
            $table->index('sent_at');
            $table->index('pinger_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pinger_notifications');
    }
};
