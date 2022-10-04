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
}
