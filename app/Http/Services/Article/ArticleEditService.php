<?php

namespace App\Http\Services\Article;

use App\Models\ArticleModel;

class ArticleEditService {
    private ArticleModel $_articleModel;

    public function __construct() {
        $this->_articleModel = new ArticleModel('article');
    }

    public function getArticleById(array $_key): array
    {
        return $this->_articleModel->select(['articleId', 'title', 'content'], $_key);
    }

    public function updateArticle(array $_data): bool
    {
        return $this->_articleModel->update(array_merge($_data, ['updatedAt' => date('Y-m-d')]));
    }
}