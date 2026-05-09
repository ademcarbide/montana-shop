@extends('admin.layout')

@section('content')
    <h1>Edit User</h1>
    <div class="admin-form">
        <form method="POST" action="{{ route('users.update', $user->id) }}">
            @csrf
            @method('PUT')
            <label>Name:</label>
            <input type="text" name="name" value="{{ old('name', $user->name) }}">
            <label>Email:</label>
            <input type="email" name="email" value="{{ old('email', $user->email) }}">
            <br>
            <button type="submit" class="btn-gold" style="margin-top: 20px;">Update User</button>
        </form>
        <a href="/admin/users" class="btn-edit" style="margin-top: 10px; display:inline-block;">Cancel</a>
    </div>

    @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li style="color:red;">{{ $error }}</li>
            @endforeach
        </ul>
    @endif
@endsection