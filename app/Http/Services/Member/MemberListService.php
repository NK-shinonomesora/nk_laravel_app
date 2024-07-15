<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;
use App\Http\Models\MABRModel;

class MemberListService {
    private MemberModel $_memberModel;
    private MABRModel $_mabrModel;

    public function __construct(MABRModel $_mabrModel) {
        $this->_memberModel = new MemberModel('member');
        $this->_mabrModel = $_mabrModel;
    }

    public function getAllMembers(): array
    {
        return ['memberList' => $this->_memberModel->select(['memberId', 'lastName', 'firstName'])];
    }

    public function deleteMemberById(array $_data): void
    {
       $this->_mabrModel->deleteMember($_data);
    }
}