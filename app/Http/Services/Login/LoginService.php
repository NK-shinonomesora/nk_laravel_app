<?php

namespace App\Http\Services\Login;

use App\Models\MemberModel;
use Illuminate\Support\Facades\Session;

class LoginService {
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }

    public function authenticate(array $_data): bool
    {
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