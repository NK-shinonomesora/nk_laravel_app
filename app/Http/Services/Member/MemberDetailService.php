<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;

class MemberDetailService {
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }

    public function getMemberById(array $_key): array
    {
        return $this->_memberModel->select(['memberId', 'lastName', 'firstName'], $_key);
    }
}