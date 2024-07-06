<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Article\ArticleDetailService;

class ArticleDetailController extends Controller
{
    private ArticleDetailService $_articleDetailService;

    public function __construct(ArticleDetailService $_articleDetailService) {
        $this->_articleDetailService = $_articleDetailService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render('article/detail/index', $this->_articleDetailService->getArticleById($_request->query()));
    }
}
