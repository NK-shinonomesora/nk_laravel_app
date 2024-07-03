<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Session;

use Closure;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class LoginCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $memberInfo = Session::get('memberInfo');
        if(is_null($memberInfo)) return Inertia::render('login/index');
        return $next($request);
    }
}
