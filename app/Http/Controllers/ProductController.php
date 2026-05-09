<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        return view('admin.products.create');
    }

   public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // ← ADDED: validates each extra image
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('products', 'public');
    }

    $product = Product::create($validated); // ← CHANGED: was Product::create($validated) now we store the result in $product so we can use it below

    if ($request->hasFile('images')) { // ← ADDED: checks if extra images were uploaded
        foreach ($request->file('images') as $image) { // ← ADDED: loops through each image one by one
            $path = $image->store('products', 'public'); // ← ADDED: saves the image to storage
            $product->images()->create(['image' => $path]); // ← ADDED: saves a row in product_images table
        }
    }

    return redirect()->route('products.index')->with('success', 'Product created successfully!');
}

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

   public function update(Request $request, $id)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // ← ADDED
    ]);

    $product = Product::findOrFail($id);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('products', 'public');
    }

    $product->update($validated);

    if ($request->hasFile('images')) { // ← ADDED: same as store
        foreach ($request->file('images') as $image) {
            $path = $image->store('products', 'public');
            $product->images()->create(['image' => $path]);
        }
    }

    return redirect()->route('products.index')->with('success', 'Product updated successfully!');
}

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}