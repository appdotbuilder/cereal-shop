<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout form.
     */
    public function index()
    {
        $cartItems = $this->getCartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->cereal->price;
        });

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(CheckoutRequest $request)
    {
        $cartItems = $this->getCartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->cereal->price;
        });

        // Calculate delivery fee based on distance
        $deliveryDistance = $request->input('delivery_distance', 2.0);
        $deliveryFee = $deliveryDistance <= 3 ? 3.99 : 7.99;

        DB::transaction(function () use ($request, $cartItems, $subtotal, $deliveryFee, $deliveryDistance) {
            // Create order
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'user_id' => auth()->id(),
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'total_amount' => $subtotal + $deliveryFee,
                'status' => 'pending',
                'delivery_method' => $request->delivery_method,
                'delivery_distance' => $deliveryDistance,
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'cereal_id' => $cartItem->cereal_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->cereal->price,
                ]);
            }

            // Clear cart
            $cartItems->each->delete();
        });

        return redirect()->route('home')->with('success', 'Order placed successfully! We will contact you soon.');
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