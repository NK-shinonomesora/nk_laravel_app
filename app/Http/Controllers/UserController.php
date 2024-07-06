<?php

namespace App\Http\Controllers;

use App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = DB::select('select * from product');
        return Inertia::render('user/index');
    }
}
