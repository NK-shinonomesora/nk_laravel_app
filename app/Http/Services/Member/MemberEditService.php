<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;

class MemberEditService {
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }

    public function getMemberById(array $_key): array
    {
        return $this->_memberModel->select(['memberId', 'lastName', 'firstName'], $_key);
    }

    public function updateMember(array $_data): bool
    {
        return $this->_memberModel->update($_data);
    }
}