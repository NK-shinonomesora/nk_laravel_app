<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Book\BookEditRule;
use App\Rules\Book\BookCreateRelationDataRule;

class BookEditRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'max:50', new BookEditRule()],
            'postRelationData' => [new BookCreateRelationDataRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'タイトルを入力してください。',
            'title.max' => 'タイトルは50文字以下で入力してください。',
        ];
    }
}
