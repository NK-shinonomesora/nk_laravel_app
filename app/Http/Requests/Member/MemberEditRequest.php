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
            'lastName' => ['required', 'max:50'],
            'firstName' => ['required', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'lastName.required' => '氏名を入力してください。',
            'lastName.max' => '氏名は50文字以下で入力してください。',
            'firstName.required' => '名前を入力してください。',
            'firstName.max' => '名前は50文字以下で入力してください。',
        ];
    }
}
