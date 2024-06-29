<?php

namespace App\Http\Services\Book;

use App\Http\Models\RBookModel;
use Illuminate\Support\Facades\Session;

class BookDetailService {
    private RBookModel $_rBookModel;

    public function __construct(RBookModel $_rBookModel) {
        $this->_rBookModel = $_rBookModel;
    }

    public function getBookById(array $_data): array
    {
        return ['bookDetail' => $this->_rBookModel->getBookById(['bookId' => intval($_data['bookId'])])];
    }
}