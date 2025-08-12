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
    description: string;
    ingredients: string;
    recipes: string | null;
    price: number;
    image_url: string;
    gallery_urls: string[] | null;
    health_benefits: string | null;
    flavor_profile: string | null;
    categories: Category[];
}

interface Props {
    cereal: Cereal;
    relatedCereals: Cereal[];
    [key: string]: unknown;
}

export default function CerealDetail({ cereal, relatedCereals }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(cereal.image_url);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        router.post(route('cart.store'), {
            cereal_id: cereal.id,
            quantity: quantity
        }, {
            onFinish: () => setIsAddingToCart(false),
            onSuccess: () => {
                // Cart updated successfully
            }
        });
    };

    const images = cereal.gallery_urls ? [cereal.image_url, ...cereal.gallery_urls] : [cereal.image_url];

    return (
        <>
            <Head title={`${cereal.name} - Premium Cereal | CerealShop`} />

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

            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex text-sm text-gray-500">
                        <Link href={route('home')} className="hover:text-orange-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href={route('shop')} className="hover:text-orange-600">Shop</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{cereal.name}</span>
                    </nav>
                </div>
            </div>

            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg overflow-hidden">
                                <img
                                    src={activeImage}
                                    alt={cereal.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRkVGM0UyIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMzIwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjcyIiBmaWxsPSIjRUE1ODA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn6WjPC90ZXh0Pgo8L3N2Zz4K';
                                    }}
                                />
                            </div>
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.slice(0, 4).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(image)}
                                            className={`aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg overflow-hidden border-2 ${
                                                activeImage === image ? 'border-orange-600' : 'border-transparent'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${cereal.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{cereal.name}</h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {cereal.categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={route('shop', { category: category.slug })}
                                            className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                                <p className="text-4xl font-bold text-orange-600 mb-4">${cereal.price}</p>
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cereal.health_benefits && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-green-800 mb-1">🌱 Health Benefits</h3>
                                        <p className="text-green-700 text-sm">{cereal.health_benefits}</p>
                                    </div>
                                )}
                                {cereal.flavor_profile && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-blue-800 mb-1">👅 Flavor Profile</h3>
                                        <p className="text-blue-700 text-sm">{cereal.flavor_profile}</p>
                                    </div>
                                )}
                            </div>

                            {/* Add to Cart */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center space-x-4 mb-4">
                                    <label className="font-medium text-gray-900">Quantity:</label>
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-2 font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-orange-400 transition-colors"
                                >
                                    {isAddingToCart ? 'Adding...' : '🛒 Add to Cart'}
                                </button>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Free delivery within 3km • Express delivery available
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mt-12">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button className="py-4 px-1 border-b-2 border-orange-600 font-medium text-sm text-orange-600">
                                    📝 Description
                                </button>
                            </nav>
                        </div>
                        <div className="py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📖 Description</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{cereal.description}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🥄 Ingredients</h3>
                                    <p className="text-gray-600">{cereal.ingredients}</p>
                                </div>
                                {cereal.recipes && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">👨‍🍳 Recipe Ideas</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{cereal.recipes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedCereals.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 You Might Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedCereals.map((related) => (
                                    <div key={related.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                            <img
                                                src={related.image_url}
                                                alt={related.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0UyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjEwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjRUE1ODA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn6WjPC90ZXh0Pgo8L3N2Zz4K';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">{related.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-orange-600">${related.price}</span>
                                                <Link
                                                    href={route('cereal.show', { cereal: related.slug })}
                                                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                                >
                                                    View →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}