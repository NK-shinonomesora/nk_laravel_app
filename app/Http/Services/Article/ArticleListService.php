<?php

namespace App\Http\Services\Article;

use App\Models\ArticleModel;
use Illuminate\Support\Facades\Session;

class ArticleListService {
    private ArticleModel $_articleModel;

    public function __construct() {
        $this->_articleModel = new ArticleModel('article');
    }

    public function getArticles(array $_columns): array
    {
        $memberInfo = Session::get('memberInfo');
        return ['articleList' => $this->_articleModel->select($_columns, ['memberId' => reset($memberInfo)->memberId])];
    }
}