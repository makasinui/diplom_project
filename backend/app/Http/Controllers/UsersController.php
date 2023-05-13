<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UsersStoreRequest;

class UsersController extends Controller
{
    public function index(Request $request) 
    {
        $per_page = $request->all()['perPage'] ?? 10;
        return User::paginate($per_page);
    }

    public function makeAdminRole($id, Request $request)
    {
        $value = $request->all()['value'];
        return User::where('id', $id)->update(['admin' => $value]);
    }

    public function update($id, UsersStoreRequest $request)
    {
        $user = User::where('id', $id)->update($request->validated());
        return $user;
    }

    public function destroy($id) 
    {
        return User::where('id', $id)->delete();
    }
}
