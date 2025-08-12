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
        Schema::create('cereals', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Cereal product name');
            $table->string('slug')->unique()->comment('URL-friendly version of name');
            $table->text('description')->comment('Product description with taste and texture details');
            $table->text('ingredients')->comment('List of ingredients');
            $table->text('recipes')->nullable()->comment('Suggested recipes');
            $table->decimal('price', 8, 2)->comment('Price in dollars');
            $table->string('image_url')->comment('Main product image URL');
            $table->json('gallery_urls')->nullable()->comment('Additional product images');
            $table->integer('stock_quantity')->default(0)->comment('Available stock');
            $table->boolean('is_featured')->default(false)->comment('Whether product is featured');
            $table->boolean('is_active')->default(true)->comment('Whether product is active');
            $table->integer('sort_order')->default(0)->comment('Sort order for display');
            $table->string('health_benefits')->nullable()->comment('Health benefits');
            $table->string('flavor_profile')->nullable()->comment('Flavor profile');
            $table->timestamps();
            
            $table->index(['is_active', 'is_featured']);
            $table->index(['is_active', 'sort_order']);
            $table->index('slug');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cereals');
    }
};