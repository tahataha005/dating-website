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

    function get_favorites(Request $request){

        $user_id = User::select("id")
        ->where("username",$request->username)
        ->get();

        $users = [];
        $favorite_ids = Favorite::select("favorite_id")
        ->where("users_id",$user_id[0]->id)
        ->get();

        foreach($favorite_ids as $favorite_id){
            $users[] = User::find($favorite_id->favorite_id);
        }
        return $users;
    }

    function get_user(Request $request){
        $user_info = User::select("*")
        ->where("id",$request->clicked_id)
        ->get();

        return response()->json($user_info);
    }

    function add_block(Request $request){

        $user = User::select("id")
        ->where("username",$request->username)
        ->get();

        $user_id = $user[0]->id;
        $blocked_id = $request->clicked_id;
    
        $block = Block::create([
            "blocker_id" => $user_id,
            "blocked_id" => $blocked_id
        ]);
        
        if($block->save()){
            return response()->json([
                "status" => "success"
            ]);
        }else{
            return response()->json([
                "status" => "failed"
            ]);
        }
    }

    function send_message(Request $request){
        $message = Message::create([
            "sender_id"=>$request->sender_id,
            "receiver_id"=>$request->receiver_id,
            "message_content"=>$request->message_content
        ]);

        if($message->save()){
            return response()->json([
                "status" => "success"
            ]);
        }else{
            return response()->json([
                "status" => "failed"
            ]);
        }
    }

    function receive_messages(Request $request){
        $messages = Message::select("*")
        ->where([
            "sender_id"=>$request->my_id,
            "receiver_id"=>$request->user_id
        ])
        ->orwhere([
            "sender_id"=>$request->user_id,
            "receiver_id"=>$request->my_id
        ])
        ->orderby("created_at")
        ->get();

        return response()->json([$messages]);
    }

    function edit_profile(Request $request){

        $update_details = [
            "full_name" => $request->full_name,
            "username" =>$request->username,
            "password" => $request->password,
            "age" => $request->age,
            "gender" => $request->gender,
            "interested" => $request->interested,
            "location" => $request->location,
            "picture" => $request->picture,
            "bio" => $request->bio,
            "incognito" => $request->incognito
        ];

        $user = User::select("*")
        ->where("username",$request->old_username)
        ->update($update_details);
    }
}