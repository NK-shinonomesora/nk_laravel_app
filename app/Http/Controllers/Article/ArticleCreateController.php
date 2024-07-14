<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Article\ArticleCreateService;
use App\Http\Requests\Article\ArticleCreateRequest;

class ArticleCreateController extends Controller
{
    private ArticleCreateService $_articleCreateService;

    public function __construct(ArticleCreateService $_articleCreateService) {
        $this->_articleCreateService = $_articleCreateService;
    }

    public function index(): Response
    {
        return Inertia::render('article/create/index');
    }

    public function create(ArticleCreateRequest $_request): RedirectResponse
    {
        $this->_articleCreateService->createNewArticle($_request->all());
        return to_route('article.list');
    }
}
