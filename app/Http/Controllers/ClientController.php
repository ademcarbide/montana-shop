<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return view('admin.clients.dashboard', compact('clients'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
    'name' => 'required|min:3|max:50',
    'quantity' => 'required|integer|min:1|max:10',
    'article_name' => 'required|string|max:255',
    'color' => 'nullable|string|max:100',
    'size' => 'nullable|string|max:10',
    'phone' => 'required|string|max:20',
    'wilaya' => 'required|string|max:100',
    'baladiya' => 'required|string|max:100',
    'delivery_type' => 'required|in:home,desk',
    'address' => 'nullable|string|max:255',
    'price' => 'required|integer',
]);

        Client::create($validated);
        return redirect('/');
    }

    public function edit($id)
    {
        $client = Client::findOrFail($id);
        return view('admin.clients.edit', compact('client'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
    'name' => 'required|min:3|max:50',
    'quantity' => 'required|integer|min:1|max:10',
    'article_name' => 'required|string|max:255',
    'color' => 'required|string|max:100',
    'phone' => 'required|string|max:20',
    'wilaya' => 'required|string|max:100',
    'baladiya' => 'required|string|max:100',
    'price' => 'required|integer',
    'size' => 'required|string|max:10',
    'address' => 'required|string|max:255',
    'delivery_type' => 'required|in:home,desk',
]);

        $client = Client::findOrFail($id);
        $client->update($validated);
        return redirect('/admin/dashboard')->with('success', 'Client updated successfully!');
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return redirect('/admin/dashboard')->with('success', 'Client deleted successfully!');
    }
}