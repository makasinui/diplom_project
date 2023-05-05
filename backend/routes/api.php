<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UsersController;
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

Route::resources([
    'products' => ProductsController::class
]);

Route::group(['middleware' => 'auth:sanctum'], function() {
    $isAdmin = auth('sanctum')->user()->admin;
    if($isAdmin) {
        Route::post('/products', [ProductsController::class, 'store']);
        Route::put('/products', [ProductsController::class, 'store']);
        Route::get('/users', [UsersController::class, 'index']);
    }
});