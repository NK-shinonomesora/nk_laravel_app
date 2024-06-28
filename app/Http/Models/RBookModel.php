<?php

namespace App\Http\Models;

use Illuminate\Support\Facades\DB;
use App\Models\BookModel;
use App\Models\ArticleBookRelationModel;

class RBookModel {
    private BookModel $_bookModel;
    private ArticleBookRelationModel $_articleBookRelationModel;

    public function __construct() {
        $this->_bookModel = new BookModel('book');
        $this->_articleBookRelationModel = new ArticleBookRelationModel('article_book_relation');
    }

    public function createNewBook(array $_data): bool
    {
        DB::beginTransaction();
        try {
            $bookId = rand(0, 2147483647);
            $postRelationData = $_data['postRelationData']; unset($_data['postRelationData']);
            $this->_bookModel->insert(array_merge(['bookId' => $bookId], $_data));
            foreach($postRelationData as $data) {
                $this->_articleBookRelationModel->insert(array_merge($data, ['bookId' => $bookId]));
            }
        } catch(Exception $e) {
            DB::rollBack();
        }
        DB::commit();
        return true;
    }
}