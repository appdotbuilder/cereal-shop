<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Cereal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $cartItems = $this->getCartItems();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->cereal->price;
        });

        return Inertia::render('cart', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cereal_id' => 'required|exists:cereals,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $sessionId = Session::getId();
        $userId = auth()->id();

        $cartItem = CartItem::where('session_id', $sessionId)
            ->where('cereal_id', $request->cereal_id)
            ->where(function ($query) use ($userId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->whereNull('user_id');
                }
            })
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'session_id' => $sessionId,
                'user_id' => $userId,
                'cereal_id' => $request->cereal_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'Item added to cart!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return back()->with('success', 'Cart updated!');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return back()->with('success', 'Item removed from cart!');
    }

    /**
     * Get cart items for current session/user.
     */
    protected function getCartItems()
    {
        $sessionId = Session::getId();
        $userId = auth()->id();

        return CartItem::with('cereal.categories')
            ->where('session_id', $sessionId)
            ->where(function ($query) use ($userId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->whereNull('user_id');
                }
            })
            ->get();
    }
}