<?php

namespace App\Http\Services\Book;

use App\Models\BookModel;
use App\Models\ArticleBookRelationModel
use Illuminate\Support\Facades\Session;

class BookDetailService {
    private BookModel $_bookModel;
    private ArticleBookRelationModel $_articleBookRelationModel;

    public function __construct() {
        $this->_bookModel = new BookModel('book');
        $this->_articleBookRelationModel = new ArticleBookRelationModel('article_book_relation');
    }

    public function getBookById(array $_data): void
    {
        $bookTitle = $this->_bookModel->select(['title'], ['bookId' => $_data['bookId']]);
        $relationData = $this->_articleBookRelationModel->select(['parentId', 'childId', 'articleId']);
    }
}