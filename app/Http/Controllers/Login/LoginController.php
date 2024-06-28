<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use App\Http\Requests\Login\LoginRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Services\Login\LoginService;


class LoginController extends Controller
{
    private LoginService $_loginService;
    
    public function __construct(LoginService $_loginService) {
        $this->_loginService = $_loginService;
    }

    public function index(): Response
    {
        return Inertia::render('login/index');
    }

    public function auth(LoginRequest $_request): RedirectResponse
    {
        return to_route('member.list');
    }
}
