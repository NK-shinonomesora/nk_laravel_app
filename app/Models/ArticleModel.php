<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class ArticleModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s (title, content, createdAt, updatedAt, memberId) VALUES (:title, :content, :createdAt, :updatedAt, :memberId)", $this->_tableName), $_data);
    }
}