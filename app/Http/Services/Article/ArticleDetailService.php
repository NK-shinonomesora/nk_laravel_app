<?php

namespace App\Http\Services\Article;

use App\Models\ArticleModel;

class ArticleDetailService {
    private ArticleModel $_articleModel;

    public function __construct() {
        $this->_articleModel = new ArticleModel('article');
    }

    public function getArticleById(array $_key): array
    {
        return $this->_articleModel->select(['title', 'content'], $_key);
    }
}