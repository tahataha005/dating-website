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

    function toggle_favorite(Request $request){

        $user = User::select("id")
        ->where("username",$request->username)
        ->get();

        $user_id = $user[0]->id;
        $fav_id = $request->fav_id;

        $present = Favorite::select("users_id","favorite_id")
        ->where("users_id",$user_id)
        ->where("favorite_id",$fav_id)
        ->get();

        
        if($present->isEmpty()){
            $fav = Favorite::create([
                "users_id" => $user_id,
                "favorite_id" => $fav_id
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
        }else{
            Favorite::where("users_id",$user_id)
            ->where("favorite_id",$fav_id)
            ->delete();

            return response()->json([
                "status" => "Deleted successfully"
            ]);
        }
    }
}