<?php

namespace App\Rules\Article;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\ArticleBookRelationModel;

class ArticleDeleteRule implements DataAwareRule, ValidationRule
{
    private ArticleBookRelationModel $_articleBookRelationModel;
    protected $data = [];

    public function __construct() {
        $this->_articleBookRelationModel = new ArticleBookRelationModel('article_book_relation');
    }
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $result = $this->_articleBookRelationModel->select(['articleId'], ['articleId' => $value]);
        if(count($result)) $fail('その記事が使われている本が存在するため、削除することはできません。');
    }
}
