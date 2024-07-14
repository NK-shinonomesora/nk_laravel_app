<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Article\ArticleEditRule;

class ArticleEditRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'max:50', new ArticleEditRule()],
            'content' => ['required', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'タイトルを入力してください。',
            'title.max' => 'タイトルは50文字以下で入力してください。',
            'content.required' => '記事の内容を入力してください。',
            'content.max' => '記事の内容は500文字以下で入力してください。',
        ];
    }
}
