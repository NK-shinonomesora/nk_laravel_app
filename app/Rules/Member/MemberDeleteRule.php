<?php

namespace App\Rules\Member;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class MemberDeleteRule implements DataAwareRule, ValidationRule
{
    protected $data = [];
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if($value === '0001A') $fail('そのユーザは管理者のため削除できません。');
    }
}
