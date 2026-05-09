<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'delivery_price',
        'currency',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}