<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function index(Request $request) 
    {
        $per_page = $request->all()['perPage'] ?? 10;
        return User::paginate($per_page);
    }
}
