@extends('admin.layout')

@section('content')
    <h1>Add Product</h1>
    <div class="admin-form">
        <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data">
            @csrf
            <label>Name:</label>
            <input type="text" name="name" value="{{ old('name') }}">
            <label>Description:</label>
            <textarea name="description">{{ old('description') }}</textarea>
            <label>Price:</label>
            <input type="text" name="price" value="{{ old('price') }}">
            <label>Image principale:</label>
           <input type="file" name="image">
           <label>Images slider:</label>
           <input type="file" name="images[]" multiple>
            <br>
            <button type="submit" class="btn-gold" style="margin-top: 20px;">Add Product</button>
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