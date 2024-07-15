<?php

namespace App\Http\Services\Book;

use App\Http\Models\RBookModel;
use Illuminate\Support\Facades\Session;

class BookEditService {
    private RBookModel $_rBookModel;

    public function __construct(RBookModel $_rBookModel) {
        $this->_rBookModel = $_rBookModel;
    }

    public function getBookById(array $_data): array
    {
        return ['bookInfo' => $this->_rBookModel->getBookById(['bookId' => intval($_data['bookId'])])];
    }

    public function updateBookById(array $_data): void
    {
        $memberInfo = Session::get('memberInfo');
        $this->_rBookModel->updateBookById(array_merge($_data, ['memberId' => reset($memberInfo)->memberId]));
    }
}