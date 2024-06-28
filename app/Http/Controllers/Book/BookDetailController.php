<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Services\Book\BookDetailService;

class BookDetailController extends Controller
{
    private BookDetailService $_bookDetailService;

    public function __construct(BookDetailService $_bookDetailService) {
        $this->_bookDetailService = $_bookDetailService;
    }

    public function index(Request $_request): Response
    {
        return Inertia::render('book/detail/index', $this->_bookDetailService->getBookById($_request->query()));
    }
}
