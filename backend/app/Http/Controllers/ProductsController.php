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
    public function index()
    {
        return ProductsResource::collection(Product::all());
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
