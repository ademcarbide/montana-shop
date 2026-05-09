@extends('admin.layout')

@section('content')

    <h1>All Clients</h1>

    <form action="{{ route('admin.logout') }}" method="POST" style="display:inline;">
        @csrf
        <button type="submit" class="btn-logout">Logout</button>
    </form>

    @if(session('success'))
        <div class="success-message">{{ session('success') }}</div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Article</th>
                <th>Quantity</th>
                <th>Color</th>
                <th>Price</th>
                <th>Phone</th>
                <th>Wilaya</th>
                <th>Price</th>
                <th>Size</th>
                <th>Actions</th>
                <th>Address</th>
                <th>Livraison</th>
                <th>Baladiya</th>
            </tr>
        </thead>
        <tbody>
            @foreach($clients as $client)
                <tr>
                    <td>{{ $client->name }}</td>
                    <td>{{ $client->article_name }}</td>
                    <td>{{ $client->quantity }}</td>
                    <td>{{ $client->color }}</td>
                    <td>{{ $client->phone }}</td>
                    <td>{{ $client->wilaya }}</td>
                    <td>{{ $client->price }}DA</td>
                    <td>{{ $client->size }}</td>
                    <td>{{ $client->address }}</td>
                    <td>{{ $client->delivery_type === 'home' ? 'Domicile' : 'Stop Desk' }}</td>
                    <td>{{ $client->baladiya }}</td>
                    <td>
                        <a href="{{ route('clients.edit', $client->id) }}" class="btn-edit">Edit</a>
                        <form action="{{ route('clients.destroy', $client->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection