<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Montana Shop Admin</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <nav>
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/products">Products</a>
        <a href="/admin/users">Users</a>
    </nav>

    <div class="admin-content">
        @yield('content')
    </div>

</body>
</html>