<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Cereal
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property string $ingredients
 * @property string|null $recipes
 * @property float $price
 * @property string $image_url
 * @property array|null $gallery_urls
 * @property int $stock_quantity
 * @property bool $is_featured
 * @property bool $is_active
 * @property int $sort_order
 * @property string|null $health_benefits
 * @property string|null $flavor_profile
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CartItem> $cartItems
 * @property-read int|null $cart_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderItem> $orderItems
 * @property-read int|null $order_items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereFlavorProfile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereGalleryUrls($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereHealthBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereIngredients($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereRecipes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal active()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal featured()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal inStock()
 * @method static \Database\Factories\CerealFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Cereal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'ingredients',
        'recipes',
        'price',
        'image_url',
        'gallery_urls',
        'stock_quantity',
        'is_featured',
        'is_active',
        'sort_order',
        'health_benefits',
        'flavor_profile',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'gallery_urls' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'stock_quantity' => 'integer',
        'sort_order' => 'integer',
    ];

    /**
     * Get the categories that belong to this cereal.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Get the cart items for this cereal.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the order items for this cereal.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Scope a query to only include active cereals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include featured cereals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include cereals in stock.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }
}