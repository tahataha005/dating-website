<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Message;
use App\Models\Block;


class UserFeaturesController extends Controller{
    function load_interested_users(Request $request){
        $user = User::select("*")
        ->where("username",$request->username)
        ->get();

        $interested_users = User::select("*")
        ->where("gender",$user->interested)
        ->get();

        return response()->json($interested_users);
    }
}
