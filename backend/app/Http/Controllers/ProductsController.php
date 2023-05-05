<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        return ProductsResource::collection(Product::paginate($query['per_page']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductsStoreRequest $request)
    {
        $created_product = Product::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(number $id)
    {
        return new ProductsResource(Book::findOrFail($id));
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
}
