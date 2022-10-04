<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Message;
use App\Models\Block;


class UserFeaturesController extends Controller{
    function load_interested_users(Request $request){
        $interested_gender = User::select("interested")
        ->where("username",$request->username)
        ->get();

        echo $interested_gender[0];

        $interested_users = User::select("*")
        ->where("gender",$interested_gender[0]->interested)
        ->get();

        return response()->json($interested_users);
    }
}
