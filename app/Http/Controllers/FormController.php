<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index()
    {
        $product = null;
        if (request()->has('product')) {
            $product = Product::with('images')->find(request('product'));
        }
        return Inertia::render('Form', [
            'product' => $product
        ]);
    }
}
