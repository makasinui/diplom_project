<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Product;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\ProductsStoreRequest;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->all();
        if(array_key_exists('search', $query)) {;
            $search_string = $query['search'];
            return ProductsResource::collection(Product::where('title', 'like', '%' . $search_string . "%")
                ->paginate($query['per_page'])
                );
        }
        if(array_key_exists('vin', $query)) {
            $search_string = $query['vin'];
            return ProductsResource::collection(
                Product::where('vin', '=', $search_string)
                ->paginate($query['per_page'])
                
            );
        }
        return ProductsResource::collection(Product::paginate($query['per_page'] ?? 10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductsStoreRequest $request)
    {
        $name = uniqid() . '_' . str_replace(' ', '_', $request->img->getClientOriginalName());
        $path = Storage::disk('public')->putFileAs('images', $request->img, $name);
        unset($request->img);
        $created_product = Product::create(array_merge($request->validated(), ['img' => $name]));
        return $created_product;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new ProductsResource(Product::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductsStoreRequest $request, Product $product): Product
    {
        $product->update($request->validated());
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return 1;
    }

    public function getPopular()
    {
        return ProductsResource::collection(Product::where('popular', '=', '1')->get());
    }
}
