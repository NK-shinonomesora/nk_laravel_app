<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Article\ArticleListService;

class ArticleListController extends Controller
{
    private ArticleListService $_articleListService;

    public function __construct(ArticleListService $_articleListService) {
        $this->_articleListService = $_articleListService;
    }

    public function index(): Response
    {
        return Inertia::render('article/list/index', $this->_articleListService->getArticles(['articleId', 'title', 'createdAt', 'updatedAt']));
    }
}
