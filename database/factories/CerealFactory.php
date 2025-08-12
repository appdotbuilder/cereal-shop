<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cereal>
 */
class CerealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cereals = [
            'Honey Crunch Oats',
            'Chocolate Delights',
            'Berry Blast Granola',
            'Vanilla Almond Crunch',
            'Cinnamon Swirl Rings',
            'Peanut Butter Puffs',
            'Strawberry Fields',
            'Golden Maple Squares',
            'Tropical Paradise Mix',
            'Caramel Crunch Bites'
        ];

        $name = fake()->randomElement($cereals);

        $ingredients = [
            'Whole grain oats, honey, almonds, natural vanilla flavor',
            'Corn, cocoa powder, sugar, salt, natural chocolate flavor',
            'Rolled oats, dried berries, maple syrup, coconut flakes',
            'Rice, almonds, vanilla extract, sea salt, coconut oil',
            'Wheat flour, cinnamon, brown sugar, salt, natural flavor',
            'Corn, peanut butter, sugar, salt, vitamin E',
            'Oats, freeze-dried strawberries, sugar, natural flavor',
            'Corn, maple syrup, brown sugar, salt, natural maple flavor',
            'Rice, dried pineapple, coconut, mango pieces, natural flavor',
            'Wheat, caramel, sugar, salt, natural caramel flavor'
        ];

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraphs(3, true),
            'ingredients' => fake()->randomElement($ingredients),
            'recipes' => fake()->paragraphs(2, true),
            'price' => fake()->randomFloat(2, 3.99, 12.99),
            'image_url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
            'gallery_urls' => [
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop'
            ],
            'stock_quantity' => fake()->numberBetween(10, 100),
            'is_featured' => fake()->boolean(30),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
            'health_benefits' => fake()->randomElement([
                'High in fiber and protein',
                'Rich in vitamins and minerals',
                'Low in sugar, high in nutrients',
                'Gluten-free and organic',
                'Whole grain goodness'
            ]),
            'flavor_profile' => fake()->randomElement([
                'Sweet and crunchy',
                'Rich and chocolatey',
                'Light and fruity',
                'Nutty and wholesome',
                'Creamy and smooth'
            ]),
        ];
    }

    /**
     * Indicate that the cereal is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}