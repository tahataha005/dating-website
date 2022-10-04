<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegistrationController extends Controller{
    
    function login(Request $request){
        $username = $request->username;
        $password = $request->password;
        $user = User::select("*")
        ->where("username",$username)
        ->where("password",$password)
        ->get();

        if($user->isEmpty()){
            return response()->json([
                "status","Failed"
            ]);
        } else{
            return response()->json([
                "status","Success"
            ]);
        }
    }

    function signup(Request $request){
        
        $username = User::select("username")
        ->where("username",$request->username)
        ->get();
        

        if($username->isEmpty()){
            $user = User::create([        
                "full_name" => $request->full_name,
                "username" =>$request->username,
                "password" => $request->password,
                "age" => $request->age,
                "gender" => $request->gender,
                "interested" => $request->interested,
                "location" => $request->location
                ]);

                if ($user->save()){
                    return response()->json([
                        "Status"=>"Success"
                    ]);
                } else{
                    return response()->json([
                        "Status"=>"Failed"
                    ]);
                }
            
        }else{
            return response()->json([
                "Status"=>"Already Exists"
            ]);
        }


    }
}
