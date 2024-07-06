<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Book\BookListService;

class BookListController extends Controller
{
    private BookListService $_bookListService;

    public function __construct(BookListService $_bookListService) {
        $this->_bookListService = $_bookListService;
    }

    public function index(): Response
    {
        return Inertia::render('book/list/index', $this->_bookListService->getBooks(['bookId' ,'title', 'createdAt', 'updatedAt']));
    }
}
