<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Article\ArticleDeleteRule;

class ArticleDeleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'articleId' => [new ArticleDeleteRule()],
        ];
    }

    public function messages(): array
    {
        return [

        ];
    }
}
