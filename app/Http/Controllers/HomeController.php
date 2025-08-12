<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cereal;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index()
    {
        $featuredCereals = Cereal::with('categories')
            ->active()
            ->featured()
            ->inStock()
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $categories = Category::active()
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $customerFavorites = Cereal::with('categories')
            ->active()
            ->inStock()
            ->orderByDesc('created_at')
            ->take(4)
            ->get();

        return Inertia::render('welcome', [
            'featuredCereals' => $featuredCereals,
            'categories' => $categories,
            'customerFavorites' => $customerFavorites,
        ]);
    }
}