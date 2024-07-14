<?php

namespace App\Rules\Article;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\ArticleModel;
use Illuminate\Support\Facades\Session;

class ArticleEditRule implements DataAwareRule, ValidationRule
{
    private ArticleModel $_articleModel;
    protected $data = [];

    public function __construct() {
        $this->_articleModel = new ArticleModel('article');
    }
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $memberInfo = Session::get('memberInfo');
        $result = $this->_articleModel->select(['articleId'], ['title' => $value, 'memberId' => reset($memberInfo)->memberId]);
        if(count($result) && ($this->_data['articleId'] !== $result[0]->articleId)) $fail('すでに同じ記事のタイトルが存在します。');
    }
}
