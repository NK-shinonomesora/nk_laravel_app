<?php

namespace App\Rules\Member;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\MemberModel;

class MemberCreateRule implements DataAwareRule, ValidationRule
{
    protected $data = [];
    private MemberModel $_memberModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
    }
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $result = $this->_memberModel->select(['memberId'], ['memberId' => $value]);
        if(count($result)) $fail('既にそのIDは使用されています。');
    }
}
