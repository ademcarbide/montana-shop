@extends('admin.layout')

@section('content')
    <h1>Edit Product</h1>
    <div class="admin-form">
        <form method="POST" action="{{ route('products.update', $product->id) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <label>Name:</label>
            <input type="text" name="name" value="{{ old('name', $product->name) }}">
            <label>Description:</label>
            <textarea name="description">{{ old('description', $product->description) }}</textarea>
            <label>Price:</label>
            <input type="number" name="price" value="{{ old('price', $product->price) }}">
            <label>Image principale:</label>
             <input type="file" name="image">
             @if($product->image)
             <img src="{{ asset('storage/' . $product->image) }}" width="100" style="margin-top: 10px; border-radius: 8px;">
            @endif

            <label>Images slider:</label>
            <input type="file" name="images[]" multiple>
            @if($product->images->count() > 0)
            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
             @foreach($product->images as $img)
            <img src="{{ asset('storage/' . $img->image) }}" width="80" style="border-radius: 8px;">
        @endforeach
    </div>
@endif
            <br>
            <button type="submit" class="btn-gold" style="margin-top: 20px;">Update Product</button>
        </form>
        <a href="/admin/products" class="btn-edit" style="margin-top: 10px; display:inline-block;">Cancel</a>
    </div>

    @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li style="color:red;">{{ $error }}</li>
            @endforeach
        </ul>
    @endif
@endsection