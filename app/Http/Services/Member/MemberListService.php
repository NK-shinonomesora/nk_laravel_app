<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;

class MemberListService {
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }

    public function getAllMembers(): array
    {
        return ['memberList' => $this->_memberModel->select([
            'memberId', 'lastName', 'firstName',
        ])];
    }
}