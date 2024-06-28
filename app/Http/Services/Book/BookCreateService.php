<?php

namespace App\Http\Services\Book;

use App\Http\Models\RBookModel;
use Illuminate\Support\Facades\Session;

class BookCreateService {
    private RBookModel $_rBookModel;

    public function __construct(RBookModel $_rBookModel) {
        $this->_rBookModel = $_rBookModel;
    }

    public function createNewBook(array $_data): void
    {
        $memberInfo = Session::get('memberInfo');
        $this->_rBookModel->createNewBook(array_merge($_data, [
            'createdAt' => date('Y-m-d'),
            'updatedAt' => null,
            'memberId' => reset($memberInfo)->memberId,
        ]));
    }
}