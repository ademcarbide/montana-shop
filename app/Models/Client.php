<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
  protected $fillable = [
    'name',
    'quantity',
    'article_name',
    'color',
    'size',
    'phone',
    'wilaya',
    'baladiya',
    'delivery_type',
    'address',
    'price',
];
}