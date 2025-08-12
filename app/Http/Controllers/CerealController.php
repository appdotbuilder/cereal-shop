<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cereal;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CerealController extends Controller
{
    /**
     * Display a listing of cereals.
     */
    public function index(Request $request)
    {
        $query = Cereal::with('categories')
            ->active()
            ->inStock();

        // Filter by category
        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Search by name or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Sort options
        $sortBy = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');

        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortDirection);
                break;
            case 'newest':
                $query->orderByDesc('created_at');
                break;
            case 'featured':
                $query->orderByDesc('is_featured')->orderBy('name');
                break;
            default:
                $query->orderBy('name', $sortDirection);
                break;
        }

        $cereals = $query->paginate(12);
        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('shop', [
            'cereals' => $cereals,
            'categories' => $categories,
            'filters' => $request->all(),
        ]);
    }

    /**
     * Display the specified cereal.
     */
    public function show(Cereal $cereal)
    {
        $cereal->load('categories');
        
        $relatedCereals = Cereal::with('categories')
            ->active()
            ->inStock()
            ->where('id', '!=', $cereal->id)
            ->whereHas('categories', function ($query) use ($cereal) {
                $query->whereIn('category_id', $cereal->categories->pluck('id'));
            })
            ->take(4)
            ->get();

        return Inertia::render('cereal-detail', [
            'cereal' => $cereal,
            'relatedCereals' => $relatedCereals,
        ]);
    }
}