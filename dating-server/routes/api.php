<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\UserFeaturesController;

Route::group(["prefix"=>"register"],function(){
    Route::post("/login",[RegistrationController::class,"login"]);
    Route::post("/signup",[RegistrationController::class,"signup"]);
});

Route::post("/home",[UserFeaturesController::class,"load_interested_users"]);
Route::post("/favorite",[UserFeaturesController::class,"add_favorite"]);