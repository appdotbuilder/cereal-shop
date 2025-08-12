<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Cereal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CerealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $categories = Category::factory(6)->create();

        // Create cereals
        $cereals = Cereal::factory(20)->create();

        // Attach categories to cereals
        foreach ($cereals as $cereal) {
            $cereal->categories()->attach(
                $categories->random(random_int(1, 3))->pluck('id')->toArray()
            );
        }
    }
}