<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;


Route::group(["prefix"=>"register"],function(){
    Route::post("/login",[RegistrationController::class,"login"]);
    Route::post("/signup",[RegistrationController::class,"signup"]);
});
