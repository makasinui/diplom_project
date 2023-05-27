<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::get('/user', [AuthController::class, 'getUser']);

Route::get('/products/popular', [ProductsController::class, 'getPopular']);
Route::resources([
    'products' => ProductsController::class
]);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/users', [UsersController::class, 'index'])->middleware('admin');
    Route::post('/products', [ProductsController::class, 'store'])->middleware('admin');
    Route::put('/products/{id}', [ProductsController::class, 'update'])->middleware('admin');
    Route::get('/order', [OrderController::class, 'index'])->middleware('admin');
    Route::post('/order', [OrderController::class, 'create']);
    Route::post('/user/{id}', [UsersController::class, 'makeAdminRole'])->middleware('admin');
    Route::put('/user/{id}', [UsersController::class, 'update'])->middleware('admin');
    Route::delete('/user/{id}', [UsersController::class, 'destroy'])->middleware('admin');
});