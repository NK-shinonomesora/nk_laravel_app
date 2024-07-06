<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Member\MemberCreateService;
use App\Http\Requests\Member\MemberCreateRequest;

class MemberCreateController extends Controller
{
    private MemberCreateService $_memberCreateService;

    public function __construct(MemberCreateService $_memberCreateService) {
        $this->_memberCreateService = $_memberCreateService;
    }

    public function index(): Response
    {
        return Inertia::render('member/create/index');
    }

    public function create(MemberCreateRequest $_request): RedirectResponse
    {
        $this->_memberCreateService->createNewMember($_request->all());
        return to_route('member.list');
    }
}
