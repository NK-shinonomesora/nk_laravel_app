<?php

namespace App\Http\Requests\Member;

use App\Rules\Member\MemberCreateRule;
use Illuminate\Foundation\Http\FormRequest;

class MemberCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'memberId' => ['required', 'max:50', new MemberCreateRule()],
            'lastName' => ['required', 'max:50'],
            'firstName' => ['required', 'max:50'],
            'password' => ['required', 'regex:/^[a-zA-Z0-9]{8,32}$/', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'memberId.required' => 'メンバーIDを入力してください。',
            'memberId.max' => 'メンバーIDは50文字以下で入力してください。',
            'lastName.required' => '氏名を入力してください。',
            'lastName.max' => '氏名は50文字以下で入力してください。',
            'firstName.required' => '名前を入力してください。',
            'firstName.max' => '名前は50文字以下で入力してください。',
            'password.required' => 'パスワードを入力してください。',
            'password.regex' => 'パスワードは半角英数字8～32文字で入力してください。。',
            'password.confirmed' => 'パスワードが異なっています。',
        ];
    }
}
