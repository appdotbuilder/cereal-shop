import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Cereal {
    id: number;
    name: string;
    slug: string;
    price: number;
    image_url: string;
    categories: Category[];
}

interface CartItem {
    id: number;
    quantity: number;
    cereal: Cereal;
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    [key: string]: unknown;
}

export default function Cart({ cartItems, subtotal }: Props) {
    const [updatingItems, setUpdatingItems] = useState<Record<number, boolean>>({});

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        
        setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
        router.patch(route('cart.update', itemId), { quantity }, {
            onFinish: () => setUpdatingItems(prev => ({ ...prev, [itemId]: false }))
        });
    };

    const removeItem = (itemId: number) => {
        router.delete(route('cart.destroy', itemId));
    };

    const deliveryFee = 3.99;
    const total = subtotal + deliveryFee;

    return (
        <>
            <Head title="🛒 Shopping Cart - CerealShop" />

            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <span className="text-2xl">🥣</span>
                            <span className="text-xl font-bold text-gray-900">CerealShop</span>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link href={route('home')} className="text-gray-700 hover:text-orange-600">Home</Link>
                            <Link href={route('shop')} className="text-gray-700 hover:text-orange-600">Shop</Link>
                            <Link href={route('cart.index')} className="text-orange-600 font-medium">🛒 Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-2">🛒 Your Cart</h1>
                        <p className="text-orange-100 text-lg">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready for checkout
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.cereal.image_url}
                                                        alt={item.cereal.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkVGM0UyIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0VBNTGWNG" gdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+loTwvdGV4dD4KPC9zdmc+';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        <Link 
                                                            href={route('cereal.show', { cereal: item.cereal.slug })}
                                                            className="hover:text-orange-600"
                                                        >
                                                            {item.cereal.name}
                                                        </Link>
                                                    </h3>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {item.cereal.categories.slice(0, 2).map((category) => (
                                                            <span key={category.id} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className="text-lg font-bold text-orange-600 mt-2">
                                                        ${item.cereal.price}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center border rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={updatingItems[item.id] || item.quantity <= 1}
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={updatingItems[item.id] || item.quantity >= 10}
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-600 hover:text-red-700 p-2"
                                                        title="Remove item"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Subtotal:</span>
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        ${(item.quantity * item.cereal.price).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Order Summary</h2>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Delivery fee:</span>
                                            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            🚚 Free delivery within 3km • Higher rates apply for longer distances
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-lg font-semibold">Total:</span>
                                                <span className="text-lg font-bold text-orange-600">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={route('checkout.index')}
                                        className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center block"
                                    >
                                        🚀 Proceed to Checkout
                                    </Link>

                                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center space-x-2 text-green-800">
                                            <span>✅</span>
                                            <span className="font-medium">Delivery Benefits</span>
                                        </div>
                                        <ul className="text-sm text-green-700 mt-2 space-y-1">
                                            <li>• Same-day delivery available</li>
                                            <li>• Fresh products guaranteed</li>
                                            <li>• Safe contactless delivery</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-8xl mb-6">🛒</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Discover our amazing selection of fresh cereals
                            </p>
                            <Link
                                href={route('shop')}
                                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
                            >
                                🛒 Start Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {/* Continue Shopping */}
                <div className="bg-white border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center">
                            <Link
                                href={route('shop')}
                                className="text-orange-600 hover:text-orange-700 font-medium"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}