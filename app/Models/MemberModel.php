<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class MemberModel extends BaseModel {
    public function insert(array $_data): bool
    {
        return DB::insert(sprintf("INSERT INTO %s VALUES (:memberId, :lastName, :firstName, :password)", $this->_tableName), $_data);
    }

    public function update(array $_data): bool
    {
        return DB::update(sprintf("UPDATE %s SET lastName=:lastName, firstName=:firstName WHERE memberId=:memberId", $this->_tableName), $_data);
    }
}