<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 15.00, 100.00);
        $deliveryFee = fake()->randomFloat(2, 3.99, 8.99);
        
        return [
            'order_number' => 'ORD-' . fake()->unique()->numerify('######'),
            'user_id' => User::factory(),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->safeEmail(),
            'customer_phone' => fake()->phoneNumber(),
            'shipping_address' => fake()->address(),
            'subtotal' => $subtotal,
            'delivery_fee' => $deliveryFee,
            'total_amount' => $subtotal + $deliveryFee,
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'delivery_method' => fake()->randomElement(['Standard Delivery', 'Express Delivery']),
            'delivery_distance' => fake()->randomFloat(2, 0.5, 15.0),
        ];
    }
}