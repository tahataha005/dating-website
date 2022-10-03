<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;


// Route::post("/login",[AuthController::class,"login"]);

Route::post("/users",[RegistrationController::class,"users"]);