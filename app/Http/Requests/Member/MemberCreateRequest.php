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
            'memberId' => ['required', new MemberCreateRule()],
            'lastName' => ['required'],
            'firstName' => ['required'],
            'password' => ['required','confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'memberId.required' => 'メンバーIDを入力してください。',
            'lastName.required' => '氏名を入力してください。',
            'firstName.required' => '名前を入力してください。',
            'password.required' => 'パスワードを入力してください。',
            'password.confirmed' => 'パスワードが異なっています。',
        ];
    }
}
