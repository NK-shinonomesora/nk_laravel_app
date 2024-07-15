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
                $this->_articleBookRelationModel->insert(array_merge($data, ['bookId' => $bookId, 'memberId' => $_data['memberId']]));
            }
        } catch(Exception $e) {
            DB::rollBack();
        }
        DB::commit();
        return true;
    }

    public function updateBookById(array $_data): bool
    {
        DB::beginTransaction();
        try {
            $this->_articleBookRelationModel->deleteById(['bookId' => $_data['bookId']]);
            $this->_bookModel->updateById(['bookId' => $_data['bookId'], 'title' => $_data['title'], 'updatedAt' => date('Y-m-d')]);
            $postRelationData = $_data['postRelationData']; unset($_data['postRelationData']);
            foreach($postRelationData as $data) {
                $this->_articleBookRelationModel->insert(array_merge($data, ['bookId' => $_data['bookId'], 'memberId' => $_data['memberId']]));
            }
        } catch(Exception $e) {
            DB::rollBack();
        }
        DB::commit();
        return true;
    }

    public function deleteBookById(array $_data): bool
    {
        DB::beginTransaction();
        try {
            $this->_articleBookRelationModel->deleteById(['bookId' => $_data['bookId']]);
            $this->_bookModel->deleteById(['bookId' => $_data['bookId']]);
        } catch(Exception $e) {
            DB::rollBack();
        }
        DB::commit();
        return true;
    }

    public function getBookById(array $_id): array
    {
        return DB::select($this->_queryEditManager(), $_id);
    }

    private function _queryEditManager(): string
    {
        return "SELECT
            b.title AS bookTitle,
            b.bookId,
            a1.articleId,
            a1.title AS articleTitle,
            a2.articleId AS parentId,
            a2.title AS parentTitle,
            a3.articleId AS childId,
            a3.title AS childTitle
            FROM
            article_book_relation abr
            LEFT JOIN book b
            ON abr.bookId = b.bookId
            LEFT JOIN article a1
            ON abr.articleId = a1.articleId
            LEFT JOIN article a2
            ON abr.parentId = a2.articleId
            LEFT JOIN article a3
            ON abr.childId = a3.articleId
            WHERE b.bookId = :bookId";
    }
}