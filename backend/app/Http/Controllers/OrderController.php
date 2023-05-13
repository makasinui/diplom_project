<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function index(Request $request)
    {   
        $per_page = $request->all()['per_page'] ?? 10;

        return Order::with(['products', 'user'])->paginate($per_page);
    }

    public function create(Request $request)
    {
        $array = $request->all();
        $user = auth('sanctum')->user();
        $order = Order::create(['user_id' => $user->id]);

        foreach ($array as $key => $value) {
            $order->products()->attach($value);
        }
        
        return $order;
    }
}
