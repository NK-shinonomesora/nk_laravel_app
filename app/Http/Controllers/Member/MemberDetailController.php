<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Member\MemberDetailService;

class MemberDetailController extends Controller
{
    private MemberDetailService $_memberDetailService;

    public function __construct(MemberDetailService $_memberDetailService) {
        $this->_memberDetailService = $_memberDetailService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render('member/detail/index', $this->_memberDetailService->getMemberById($_request->query()));
    }
}
