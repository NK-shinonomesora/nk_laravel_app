<?php

namespace App\Http\Services\Article;

use App\Models\ArticleModel;
use Illuminate\Support\Facades\Session;

class ArticleCreateService {
    private ArticleModel $_articleModel;

    public function __construct() {
        $this->_articleModel = new ArticleModel('article');
    }

    public function createNewArticle(array $_data): void
    {
        $memberInfo = Session::get('memberInfo');
        $this->_articleModel->insert(array_merge($_data, [
            'createdAt' => date('Y-m-d'),
            'updatedAt' => null,
            'memberId' => reset($memberInfo)->memberId,
        ]));
    }
}