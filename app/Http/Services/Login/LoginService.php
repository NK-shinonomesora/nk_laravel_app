<?php

namespace App\Http\Services\Login;

use App\Models\MemberModel;
use App\Models\AppConfigModel;
use Illuminate\Support\Facades\Session;

class LoginService {
    private MemberModel $_memberModel;
    private AppConfigModel $_appConfigModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
        $this->_appConfigModel = new AppConfigModel('app_config');
    }

    public function authenticate(array $_data): bool
    {
        $salt = $this->_appConfigModel->select(['value'], ['purpose' => 'password salt'])[0];
        $_data['password'] = hash(config('hash.algo'), sprintf("%s%s", $_data['password'], $salt->value));
        $result = $this->_memberModel->select(['memberId', 'lastName', 'firstName'], $_data);
        if(count($result)) {
            $this->_createSession($result);
            return true;
        }
        return false;
    }

    private function _createSession(array $_data): void
    {
        Session::put(['memberInfo' => $_data]);
    }

    public function logout(): void
    {
        Session::forget('memberInfo');
    }
}