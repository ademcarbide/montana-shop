@extends('admin.layout')

@section('content')
    <h1>Add User</h1>
    <div class="admin-form">
        <form method="POST" action="{{ route('users.store') }}">
            @csrf
            <label>Name:</label>
            <input type="text" name="name" value="{{ old('name') }}">
            <label>Email:</label>
            <input type="email" name="email" value="{{ old('email') }}">
            <label>Password:</label>
            <input type="password" name="password">
            <br>
            <button type="submit" class="btn-gold" style="margin-top: 20px;">Add User</button>
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