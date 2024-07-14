<?php

namespace App\Rules\Book;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\BookModel;
use Illuminate\Support\Facades\Session;

class BookEditRule implements DataAwareRule, ValidationRule
{
    private BookModel $_bookModel;
    protected $data = [];

    public function __construct() {
        $this->_bookModel = new BookModel('book');
    }
 
    public function setData(array $data): static
    {
        $this->_data = $data;
 
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $memberInfo = Session::get('memberInfo');
        $result = $this->_bookModel->select(['bookId'], ['title' => $value, 'memberId' => reset($memberInfo)->memberId]);
        if(count($result) && ($this->_data['bookId'] !== $result[0]->bookId)) $fail('すでに同じ本のタイトルが存在します。');
    }
}
