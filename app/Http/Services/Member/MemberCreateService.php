<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;

class MemberCreateService {
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }

    public function createNewMember(array $_data): void
    {
        unset($_data['password_confirmation']);
        $this->_memberModel->insert($_data);
    }
}