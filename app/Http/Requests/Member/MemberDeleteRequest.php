<?php

namespace App\Http\Requests\Member;

use App\Rules\Member\MemberDeleteRule;
use Illuminate\Foundation\Http\FormRequest;

class MemberDeleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'memberId' => ['required', 'max:50', new MemberDeleteRule()],
        ];
    }

    public function messages(): array
    {
        return [

        ];
    }
}
