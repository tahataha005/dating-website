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
        
        $interested_users = User::select("*")
        ->where("gender",$interested_gender[0]->interested)
        ->get();

        return response()->json($interested_users);
    }

    function add_favorite(Request $request){

        $user_id = User::select("id")
        ->where("username",$request->username)
        ->get();

        $fav = Favorite::create([
            "users_id" => $user_id[0]->id,
            "favorite_id" => $request->fav_id
        ]);

        if($fav->save()){
            return response()->json([
                "status" => "Success"
            ]);
        }else{
            return response()->json([
                "status" => "Failed"
            ]);
        }
    }
}