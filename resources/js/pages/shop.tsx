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
    price: number;
    image_url: string;
    categories: Category[];
}

interface PaginatedCereals {
    data: Cereal[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    last_page: number;
}

interface Props {
    cereals: PaginatedCereals;
    categories: Category[];
    filters: {
        category?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
        sort?: string;
        direction?: string;
    };
    [key: string]: unknown;
}

export default function Shop({ cereals, categories, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleFilterChange = (key: string, value: string) => {
        const newFilters: Record<string, string> = { ...filters, [key]: value };
        if (!value) delete newFilters[key];
        router.get(route('shop'), newFilters, { preserveState: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange('search', searchQuery);
    };

    return (
        <>
            <Head title="🛒 Shop Cereals - Premium Selection" />

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
                            <Link href={route('shop')} className="text-orange-600 font-medium">Shop</Link>
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600">🛒 Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">🛒 Shop Premium Cereals</h1>
                        <p className="text-orange-100 text-lg">
                            Discover our full collection of fresh, wholesome cereals
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filters</h2>

                                {/* Search */}
                                <form onSubmit={handleSearch} className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search cereals..."
                                            className="flex-1 rounded-l-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-orange-600 text-white px-4 rounded-r-lg hover:bg-orange-700 transition-colors"
                                        >
                                            🔍
                                        </button>
                                    </div>
                                </form>

                                {/* Categories */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={filters.category || ''}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.slug}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.min_price || ''}
                                            onChange={(e) => handleFilterChange('min_price', e.target.value)}
                                            className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.max_price || ''}
                                            onChange={(e) => handleFilterChange('max_price', e.target.value)}
                                            className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* Sort */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                    <select
                                        value={filters.sort || 'name'}
                                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="newest">Newest</option>
                                        <option value="featured">Featured</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                {Object.keys(filters).length > 0 && (
                                    <button
                                        onClick={() => router.get(route('shop'))}
                                        className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:w-3/4">
                            {/* Results Header */}
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-600">
                                    Showing {cereals.data.length} of {cereals.data.length} cereals
                                </p>
                            </div>

                            {cereals.data.length > 0 ? (
                                <>
                                    {/* Products Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {cereals.data.map((cereal) => (
                                            <div key={cereal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cereal.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cereal.description.substring(0, 100)}...</p>
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {cereal.categories.slice(0, 2).map((category) => (
                                                            <span key={category.id} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xl font-bold text-orange-600">${cereal.price}</span>
                                                        <Link
                                                            href={route('cereal.show', { cereal: cereal.slug })}
                                                            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {cereals.links && (
                                        <div className="flex justify-center space-x-1">
                                            {cereals.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        link.active
                                                            ? 'bg-orange-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No cereals found</h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your filters or search terms
                                    </p>
                                    <button
                                        onClick={() => router.get(route('shop'))}
                                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}