<?php

namespace App\Http\Services\Book;

use App\Models\BookModel;
use App\Http\Models\RBookModel;
use Illuminate\Support\Facades\Session;

class BookListService {
    private BookModel $_bookModel;
    private RBookModel $_rBookModel;

    public function __construct(RBookModel $_rBookModel) {
        $this->_bookModel = new BookModel('book');
        $this->_rBookModel = $_rBookModel;
    }

    public function getBooks(array $_columns): array
    {
        $memberInfo = Session::get('memberInfo');
        return ['bookList' => $this->_bookModel->select($_columns, ['memberId' => reset($memberInfo)->memberId,])];
    }

    public function deleteBookById(array $_data): void
    {
        $this->_rBookModel->deleteBookById($_data);
    }
}