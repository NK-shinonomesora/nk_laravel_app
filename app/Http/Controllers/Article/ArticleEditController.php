<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Article\ArticleEditService;

class ArticleEditController extends Controller
{
    private ArticleEditService $_articleEditService;

    public function __construct(ArticleEditService $_articleEditService) {
        $this->_articleEditService = $_articleEditService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render('article/edit/index', $this->_articleEditService->getArticleById($_request->query()));
    }

    public function update(Request $_request): RedirectResponse
    {
        $this->_articleEditService->updateArticle($_request->all());
        return to_route('article.list');
    }
}
