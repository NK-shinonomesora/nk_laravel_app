<?php

namespace App\Http\Services\Member;

use App\Models\MemberModel;
use App\Models\AppConfigModel;

class MemberCreateService {
    private MemberModel $_memberModel;
    private AppConfigModel $_appConfigModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
        $this->_appConfigModel = new AppConfigModel('app_config');
    }

    public function createNewMember(array $_data): void
    {
        $salt = $this->_appConfigModel->select(['value'], ['purpose' => 'password salt'])[0];
        $_data['password'] = hash(config('hash.algo'), sprintf("%s%s", $_data['password'], $salt->value));
        unset($_data['password_confirmation']);
        $this->_memberModel->insert($_data);
    }
}