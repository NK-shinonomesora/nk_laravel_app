<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class ArticleBookRelationModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s (parentId, childId, articleId, bookId) VALUES (:parentId, :childId, :articleId, :bookId)", $this->_tableName), $_data);
    }
}