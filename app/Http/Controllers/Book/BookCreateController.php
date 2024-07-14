<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\Book\BookCreateService;
use App\Http\Services\Article\ArticleListService;
use App\Http\Requests\Book\BookCreateRequest;

class BookCreateController extends Controller
{
    private BookCreateService $_bookCreateService;
    private ArticleListService $_articleListService;

    public function __construct(BookCreateService $_bookCreateService, ArticleListService $_articleListService) {
        $this->_bookCreateService = $_bookCreateService;
        $this->_articleListService = $_articleListService;
    }

    public function index(): Response
    {
        return Inertia::render('book/create/index', $this->_articleListService->getArticles(['articleId', 'title', 'content']));
    }

    public function create(BookCreateRequest $_request): RedirectResponse
    {
        $this->_bookCreateService->createNewBook($_request->all());
        return to_route('book.list');
    }
}
