<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Member\MemberCreateController;
use App\Http\Controllers\Member\MemberListController;
use App\Http\Controllers\Member\MemberDetailController;
use App\Http\Controllers\Member\MemberEditController;
use App\Http\Controllers\Article\ArticleListController;
use App\Http\Controllers\Article\ArticleCreateController;
use App\Http\Controllers\Article\ArticleDetailController;
use App\Http\Controllers\Book\BookCreateController;
use App\Http\Controllers\Book\BookListController;
use App\Http\Controllers\Book\BookDetailController;
use App\Http\Controllers\Login\LoginController;
use App\Http\Middleware\LoginCheckMiddleware;

Route::middleware([App\Http\Middleware\LoginCheckMiddleware::class])->group(function () {
    Route::get('/member/create', [MemberCreateController::class, 'index']);
    Route::get('/member/list', [MemberListController::class, 'index'])->name('member.list');
    Route::get('/member/detail', [MemberDetailController::class, 'index'])->name('member.detail');
    Route::get('/member/edit', [MemberEditController::class, 'index'])->name('member.edit');
    
    Route::get('/article/list', [ArticleListController::class, 'index'])->name('article.list');
    Route::get('/article/create', [ArticleCreateController::class, 'index']);
    Route::get('/article/detail', [ArticleDetailController::class, 'index'])->name('article.detail');
    
    Route::get('/book/create', [BookCreateController::class, 'index']);
    Route::get('/book/list', [BookListController::class, 'index'])->name('book.list');
    Route::get('/book/detail', [BookDetailController::class, 'index'])->name('book.detail');
    
});

Route::get('/login', [LoginController::class, 'index'])->name('login.home');

Route::post('/member/create', [MemberCreateController::class, 'create']);
Route::post('/member/edit', [MemberEditController::class, 'update'])->name('member.edit');

Route::post('/article/create', [ArticleCreateController::class, 'create']);

Route::post('/book/create', [BookCreateController::class, 'create']);

Route::post('/login', [LoginController::class, 'auth']);
Route::post('/login/logout', [LoginController::class, 'logout']);