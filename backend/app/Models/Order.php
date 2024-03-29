<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
