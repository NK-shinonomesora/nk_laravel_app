<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Member\MemberEditService;
use App\Http\Requests\Member\MemberEditRequest;

class MemberEditController extends Controller
{
    private MemberEditService $_memberEditService;

    public function __construct(MemberEditService $_memberEditService) {
        $this->_memberEditService = $_memberEditService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render('member/edit/index', $this->_memberEditService->getMemberById($_request->query()));
    }

    public function update(MemberEditRequest $_request): RedirectResponse
    {
        $this->_memberEditService->updateMember($_request->all());
        return to_route('member.list');
    }
}
