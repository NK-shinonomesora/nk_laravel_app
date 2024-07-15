<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class BaseModel {
    protected string $_tableName;

    public function __construct(string $_tableName) {
        $this->_tableName = $_tableName;
    }

    public function select(array $_columns, array $_whereKey = []): array
    {
        return DB::table($this->_tableName)
                ->select($_columns)
                ->where($_whereKey)
                ->get()
                ->toArray();
    }

    public function deleteByMemberId(array $_data): bool
    {
        return DB::delete(sprintf("DELETE FROM %s WHERE memberId = :memberId", $this->_tableName), $_data);
    }
}