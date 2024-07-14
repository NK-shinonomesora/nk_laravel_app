<?php

namespace App\Rules\Book;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class BookCreateRelationDataRule implements DataAwareRule, ValidationRule
{
    protected $data = [];
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $articleIds = [];
        foreach($value as $data) {
            if(in_array($data['articleId'], $articleIds)) {
                $fail('同じ記事を複数選択することはできません。');
                return;
            }
            array_push($articleIds, $data['articleId']);
        }
    }
}
