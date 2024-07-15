<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class ArticleModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s (title, content, createdAt, updatedAt, memberId) VALUES (:title, :content, :createdAt, :updatedAt, :memberId)", $this->_tableName), $_data);
    }

    public function update(array $_data): bool
    {
        return DB::update(sprintf("UPDATE %s SET title=:title, content=:content, updatedAt=:updatedAt WHERE articleId=:articleId", $this->_tableName), $_data);
    }

    public function deleteById(array $_data): bool
    {
        return DB::delete(sprintf("DELETE FROM %s WHERE articleId = :articleId", $this->_tableName), $_data);
    }
}