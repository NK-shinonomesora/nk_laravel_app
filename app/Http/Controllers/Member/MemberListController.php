<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Member\MemberListService;

class MemberListController extends Controller
{
    private MemberListService $_memberListService;

    public function __construct(MemberListService $_memberListService) {
        $this->_memberListService = $_memberListService;
    }

    public function index(): Response
    {
        return Inertia::render('member/list/index', $this->_memberListService->getAllMembers());
    }
}
