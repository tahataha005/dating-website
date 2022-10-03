<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegistrationController extends Controller{
    
    function users(){
        return response()->json(User::all());
    }
}
