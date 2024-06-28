<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;

class MemberEditRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lastName' => ['required'],
            'firstName' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'lastName.required' => '氏名を入力してください。',
            'firstName.required' => '名前を入力してください。',
        ];
    }
}
