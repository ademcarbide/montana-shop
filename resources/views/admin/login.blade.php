<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="login-page">
        <div class="login-container">
            <h1 class="login-title">Montana Shop</h1>
            <form method="POST" action="{{ route('admin.authenticate') }}">
                @csrf
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <button type="submit" class="btn-login">Login</button>
            </form>
            @if($errors->any())
                <ul>
                    @foreach($errors->all() as $error)
                        <li style="color: red; margin-top: 10px;">{{ $error }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    </div>
</body>
</html>