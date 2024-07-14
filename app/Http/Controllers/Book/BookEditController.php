<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Book\BookEditService;
use App\Http\Services\Article\ArticleListService;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Book\BookEditRequest;

class BookEditController extends Controller
{
    private BookEditService $_bookEditService;
    private ArticleListService $_articleListService;

    public function __construct(BookEditService $_bookEditService, ArticleListService $_articleListService) {
        $this->_bookEditService = $_bookEditService;
        $this->_articleListService = $_articleListService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render(
            'book/edit/index',
            array_merge($this->_bookEditService->getBookById($_request->query()), $this->_articleListService->getArticles(['articleId', 'title', 'content'])));
    }

    public function update(BookEditRequest $_request): RedirectResponse
    {
        $this->_bookEditService->updateBookById($_request->all());
        return to_route('book.list');
    }
}
