<?php

namespace App\Http\Requests\Login;

use App\Rules\Login\LoginRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'memberId' => ['required'],
            'password' => ['required', new LoginRule()],
        ];
    }

    public function messages(): array
    {
        return [
            'memberId.required' => 'メンバーIDを入力してください。',
            'password.required' => 'パスワードを入力してください。',
        ];
    }
}
