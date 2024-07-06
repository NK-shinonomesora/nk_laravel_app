<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class BookModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s (bookId, title, createdAt, updatedAt, memberId) VALUES (:bookId, :title, :createdAt, :updatedAt, :memberId)", $this->_tableName), $_data);
    }
}