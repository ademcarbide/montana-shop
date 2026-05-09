<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FormController;

// User side (React)
Route::get('/', [HomeController::class, 'index']);

Route::get('/form', [FormController::class, 'index']);

Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');

// Admin login
Route::get('/admin', [AdminController::class, 'login'])->name('admin.login');
Route::post('/admin', [AdminController::class, 'authenticate'])->name('admin.authenticate');
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin protected routes
Route::middleware('admin')->prefix('admin')->group(function () {
    Route::get('/dashboard', [ClientController::class, 'index'])->name('clients.index');
    Route::get('/clients/{id}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('/clients/{id}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');

    Route::resource('products', ProductController::class);
    Route::resource('users', UserController::class);
});