import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Props {
    featuredCereals: Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image_url: string;
        is_featured: boolean;
        categories: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    }>;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        image_url: string;
    }>;
    customerFavorites: Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image_url: string;
        categories: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ featuredCereals, categories, customerFavorites }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🥣 CerealShop - Fresh & Wholesome Cereals Delivered">
                <meta name="description" content="Discover our premium collection of fresh, wholesome cereals. From healthy options to kid-friendly favorites, we deliver quality cereals right to your door." />
            </Head>

            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">🥣</span>
                            <span className="text-xl font-bold text-gray-900">CerealShop</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href={route('home')} className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
                            <Link href={route('shop')} className="text-gray-700 hover:text-orange-600 font-medium">Shop</Link>
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600 font-medium">🛒 Cart</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-orange-600 font-medium"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            🌾 Fresh & Wholesome
                            <br />
                            <span className="text-orange-600">Cereals Delivered</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Start your day right with our premium collection of nutritious, delicious cereals. 
                            From healthy options to kid-friendly favorites, we have something for everyone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('shop')}
                                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                            >
                                🛒 Shop Now
                            </Link>
                            <Link
                                href="#featured"
                                className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-orange-600"
                            >
                                ✨ View Featured
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">🍯 Shop by Category</h2>
                        <p className="text-gray-600 text-lg">Find the perfect cereal for your lifestyle and taste</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('shop', { category: category.slug })}
                                className="group text-center p-6 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-orange-200 transition-colors">
                                    🥣
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Featured Cereals</h2>
                        <p className="text-gray-600 text-lg">Our top picks for the best breakfast experience</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCereals.map((cereal) => (
                            <div key={cereal.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                    <img
                                        src={cereal.image_url}
                                        alt={cereal.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0UyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjEwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjRUE1ODA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn6WjPC90ZXh0Pgo8L3N2Zz4K';
                                        }}
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{cereal.name}</h3>
                                        <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">Featured</span>
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{cereal.description.substring(0, 100)}...</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-orange-600">${cereal.price}</span>
                                        <Link
                                            href={route('cereal.show', { cereal: cereal.slug })}
                                            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href={route('shop')}
                            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                            View All Products →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Favorites */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">❤️ Customer Favorites</h2>
                        <p className="text-gray-600 text-lg">Most loved cereals by our community</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {customerFavorites.map((cereal) => (
                            <div key={cereal.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                    <img
                                        src={cereal.image_url}
                                        alt={cereal.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0UyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjEwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjRUE1ODA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn6WjPC90ZXh0Pgo8L3N2Zz4K';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">{cereal.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-orange-600">${cereal.price}</span>
                                        <Link
                                            href={route('cereal.show', { cereal: cereal.slug })}
                                            className="text-orange-600 hover:text-orange-700 font-medium"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">🚚 Fast Delivery to Your Door</h2>
                    <p className="text-orange-100 text-lg mb-8">
                        Free delivery within 3km • Express delivery available • Fresh products guaranteed
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <h3 className="text-white font-semibold mb-1">Fast Delivery</h3>
                            <p className="text-orange-100 text-sm">Same day delivery available</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🌱</div>
                            <h3 className="text-white font-semibold mb-1">Fresh & Quality</h3>
                            <p className="text-orange-100 text-sm">Premium ingredients only</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">💝</div>
                            <h3 className="text-white font-semibold mb-1">Customer First</h3>
                            <p className="text-orange-100 text-sm">100% satisfaction guarantee</p>
                        </div>
                    </div>
                    <Link
                        href={route('shop')}
                        className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Start Shopping Now 🛒
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🥣</span>
                                <span className="text-xl font-bold">CerealShop</span>
                            </div>
                            <p className="text-gray-400">
                                Fresh, wholesome cereals delivered to your door. Start your day right with quality nutrition.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link href={route('shop')} className="text-gray-400 hover:text-white block">Shop All</Link>
                                <Link href={route('home')} className="text-gray-400 hover:text-white block">Categories</Link>
                                <Link href={route('home')} className="text-gray-400 hover:text-white block">Featured</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Customer Service</h3>
                            <div className="space-y-2">
                                <p className="text-gray-400">📞 (555) 123-CEREAL</p>
                                <p className="text-gray-400">✉️ hello@cerealshop.com</p>
                                <p className="text-gray-400">🕒 Mon-Fri 8AM-6PM</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Follow Us</h3>
                            <div className="space-y-2">
                                <p className="text-gray-400">📱 @cerealshop</p>
                                <p className="text-gray-400">📧 Newsletter signup</p>
                                <p className="text-gray-400">⭐ Join our community</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2024 CerealShop. Made with ❤️ for cereal lovers everywhere.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}