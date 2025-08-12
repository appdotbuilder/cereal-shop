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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name (e.g., Healthy, Kid-Friendly)');
            $table->string('slug')->unique()->comment('URL-friendly version of name');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('image_url')->nullable()->comment('Category image URL');
            $table->boolean('is_active')->default(true)->comment('Whether category is active');
            $table->integer('sort_order')->default(0)->comment('Sort order for display');
            $table->timestamps();
            
            $table->index(['is_active', 'sort_order']);
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};