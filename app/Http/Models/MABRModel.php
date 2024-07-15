<?php

namespace App\Http\Models;

use Illuminate\Support\Facades\DB;
use App\Models\MemberModel;
use App\Models\ArticleModel;
use App\Models\BookModel;
use App\Models\ArticleBookRelationModel;

class MABRModel {
    private MemberModel $_memberModel;
    private ArticleModel $_articleModel;
    private BookModel $_bookModel;
    private ArticleBookRelationModel $_articleBookRelationModel;

    public function __construct() {
        $this->_memberModel = new MemberModel('member');
        $this->_articleModel = new ArticleModel('article');
        $this->_bookModel = new BookModel('book');
        $this->_articleBookRelationModel = new ArticleBookRelationModel('article_book_relation');
    }

    public function deleteMember(array $_data): bool
    {
        DB::beginTransaction();
        try {
            $this->_articleBookRelationModel->deleteByMemberId($_data);
            $this->_bookModel->deleteByMemberId($_data);
            $this->_articleModel->deleteByMemberId($_data);
            $this->_memberModel->deleteByMemberId($_data);
        } catch(Exception $e) {
            DB::rollBack();
        }
        DB::commit();
        return true;
    }
}