import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

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

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    user: User | null;
    [key: string]: unknown;
}

export default function Checkout({ cartItems, subtotal, user }: Props) {
    const [deliveryDistance, setDeliveryDistance] = useState(2.0);
    
    const { data, setData, post, processing, errors } = useForm({
        customer_name: user?.name || '',
        customer_email: user?.email || '',
        customer_phone: '',
        shipping_address: '',
        delivery_method: 'standard',
        delivery_distance: deliveryDistance,
    });

    const deliveryFee = deliveryDistance <= 3 ? 3.99 : 7.99;
    const total = subtotal + deliveryFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const handleDistanceChange = (distance: number) => {
        setDeliveryDistance(distance);
        setData('delivery_distance', distance);
    };

    return (
        <>
            <Head title="🚀 Checkout - CerealShop" />

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
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600">🛒 Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Progress Indicator */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-center space-x-8">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                            <span>Cart</span>
                        </div>
                        <div className="w-12 h-0.5 bg-green-600"></div>
                        <div className="flex items-center space-x-2 text-orange-600">
                            <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span className="font-medium">Checkout</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <span className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Complete</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Delivery Information</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Customer Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                className={`w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                                                    errors.customer_name ? 'border-red-300' : ''
                                                }`}
                                                required
                                            />
                                            {errors.customer_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.customer_email}
                                                onChange={(e) => setData('customer_email', e.target.value)}
                                                className={`w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                                                    errors.customer_email ? 'border-red-300' : ''
                                                }`}
                                                required
                                            />
                                            {errors.customer_email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            className={`w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                                                errors.customer_phone ? 'border-red-300' : ''
                                            }`}
                                            required
                                        />
                                        {errors.customer_phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer_phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shipping Address *
                                        </label>
                                        <textarea
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            rows={3}
                                            className={`w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                                                errors.shipping_address ? 'border-red-300' : ''
                                            }`}
                                            placeholder="Please provide your complete address including street, city, and postal code"
                                            required
                                        />
                                        {errors.shipping_address && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_address}</p>
                                        )}
                                    </div>

                                    {/* Delivery Options */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚚 Delivery Options</h3>
                                        
                                        <div className="space-y-4">
                                            <div className="border rounded-lg p-4">
                                                <label className="flex items-start space-x-3">
                                                    <input
                                                        type="radio"
                                                        name="delivery_method"
                                                        value="standard"
                                                        checked={data.delivery_method === 'standard'}
                                                        onChange={(e) => setData('delivery_method', e.target.value)}
                                                        className="mt-1 text-orange-600 focus:ring-orange-500"
                                                    />
                                                    <div>
                                                        <div className="font-medium">Standard Delivery</div>
                                                        <div className="text-sm text-gray-600">1-2 business days • Free within 3km</div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <label className="flex items-start space-x-3">
                                                    <input
                                                        type="radio"
                                                        name="delivery_method"
                                                        value="express"
                                                        checked={data.delivery_method === 'express'}
                                                        onChange={(e) => setData('delivery_method', e.target.value)}
                                                        className="mt-1 text-orange-600 focus:ring-orange-500"
                                                    />
                                                    <div>
                                                        <div className="font-medium">Express Delivery</div>
                                                        <div className="text-sm text-gray-600">Same day or next day • Priority handling</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Estimated Distance (km)
                                            </label>
                                            <select
                                                value={deliveryDistance}
                                                onChange={(e) => handleDistanceChange(parseFloat(e.target.value))}
                                                className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                            >
                                                <option value={1.0}>Within 1km</option>
                                                <option value={2.0}>1-2km</option>
                                                <option value={3.0}>2-3km (Free zone)</option>
                                                <option value={5.0}>3-5km</option>
                                                <option value={10.0}>5-10km</option>
                                                <option value={15.0}>10-15km</option>
                                            </select>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {deliveryDistance <= 3 
                                                    ? '🎉 Free delivery within 3km!' 
                                                    : '💰 Additional delivery charges apply beyond 3km'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-orange-400 transition-colors"
                                    >
                                        {processing ? 'Processing...' : '🚀 Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Order Summary</h2>
                                
                                {/* Cart Items */}
                                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.cereal.image_url}
                                                    alt={item.cereal.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {item.cereal.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${(item.quantity * item.cereal.price).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 mb-6 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery fee:</span>
                                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                                        <span>Total:</span>
                                        <span className="text-orange-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-green-800 mb-2">🛡️ Secure Checkout</h4>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>• SSL encrypted payment</li>
                                        <li>• 100% satisfaction guarantee</li>
                                        <li>• Fresh product promise</li>
                                        <li>• Easy returns & refunds</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}