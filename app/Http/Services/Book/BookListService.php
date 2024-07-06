<?php

namespace App\Http\Services\Book;

use App\Models\BookModel;
use Illuminate\Support\Facades\Session;

class BookListService {
    private BookModel $_bookModel;

    public function __construct() {
        $this->_bookModel = new BookModel('book');
    }

    public function getBooks(array $_columns): array
    {
        $memberInfo = Session::get('memberInfo');
        return ['bookList' => $this->_bookModel->select($_columns, ['memberId' => reset($memberInfo)->memberId,])];
    }
}