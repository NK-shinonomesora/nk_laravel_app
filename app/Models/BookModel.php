<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class BookModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s (bookId, title, createdAt, updatedAt, memberId) VALUES (:bookId, :title, :createdAt, :updatedAt, :memberId)", $this->_tableName), $_data);
    }

    public function deleteById(array $_data): bool
    {
        return DB::delete(sprintf("DELETE FROM %s WHERE bookId = :bookId", $this->_tableName), $_data);
    }

    public function updateById(array $_data): bool
    {
        return DB::update(sprintf("UPDATE %s SET title = :title, updatedAt = :updatedAt WHERE bookId = :bookId", $this->_tableName), $_data);
    }
}