<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TestSelectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('test/select/index');
    }
}
