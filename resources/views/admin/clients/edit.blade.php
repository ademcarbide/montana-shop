@extends('admin.layout')

@section('content')
    <h1>Edit Client</h1>
    <div class="admin-form">
        <form method="POST" action="{{ route('clients.update', $client->id) }}">
            @csrf
            @method('PUT')
            <label>Name:</label>
            <input type="text" name="name" value="{{ old('name', $client->name) }}">
            <label>Article:</label>
            <input type="text" name="article_name" value="{{ old('article_name', $client->article_name) }}">
            <label>Quantity:</label>
            <input type="number" name="quantity" value="{{ old('quantity', $client->quantity) }}">
            <label>Color:</label>
            <input type="text" name="color" value="{{ old('color', $client->color) }}">
            <label>Phone:</label>
            <input type="text" name="phone" value="{{ old('phone', $client->phone) }}">
            <label>Wilaya:</label>
            <input type="text" name="wilaya" value="{{ old('wilaya', $client->wilaya) }}">
            <br>
            <button type="submit" class="btn-gold" style="margin-top: 20px;">Update</button>
        </form>
        <a href="/admin/dashboard" class="btn-edit" style="margin-top: 10px; display:inline-block;">Cancel</a>
    </div>

    @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li style="color:red;">{{ $error }}</li>
            @endforeach
        </ul>
    @endif
@endsection