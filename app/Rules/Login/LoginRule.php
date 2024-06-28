<?php

namespace App\Rules\Login;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Services\Login\LoginService;

class LoginRule implements DataAwareRule, ValidationRule
{
    protected $data = [];
    private LoginService $_loginService;

    public function __construct() {
        $this->_loginService = new LoginService();
    }
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $result = $this->_loginService->authenticate($this->_data);
        if(!$result) $fail('IDまたはパスワードが間違っています。');
    }
}
