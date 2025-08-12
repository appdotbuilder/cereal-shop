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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order number');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('customer_name')->comment('Customer name');
            $table->string('customer_email')->comment('Customer email');
            $table->string('customer_phone')->comment('Customer phone');
            $table->text('shipping_address')->comment('Shipping address');
            $table->decimal('subtotal', 10, 2)->comment('Subtotal amount');
            $table->decimal('delivery_fee', 8, 2)->comment('Delivery fee');
            $table->decimal('total_amount', 10, 2)->comment('Total order amount');
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->string('delivery_method')->comment('Delivery method selected');
            $table->decimal('delivery_distance', 5, 2)->nullable()->comment('Delivery distance in km');
            $table->timestamps();
            
            $table->index('order_number');
            $table->index(['user_id', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};