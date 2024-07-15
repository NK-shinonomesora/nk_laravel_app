import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import { router } from '@inertiajs/react';
import BaseButton from "../component/baseButton";

interface TableCellListProps {
    data: object
    keys: string[]
    url: string,
    editUrl: string,
    deleteUrl: string,
    primaryKey: string,
}

const TableCellList: React.FC<TableCellListProps> = ({ data, keys, url, editUrl, deleteUrl, primaryKey }) => {
    const [primaryKeyValue, setPrimaryKeyValue] = useState<string>('');

    const changePrimaryKeyValue = (value: string) => {
        setPrimaryKeyValue(value);
    }

    const handleSubmit = (e, url: string) => {
        e.preventDefault()
        router.get(url, { [primaryKey]: primaryKeyValue })
    }

    const getTableCell = (index: number, key: string) => {
        if(index === 0) {
            return (
                <TableCell>
                    <form onSubmit={(e) => handleSubmit(e, url)}>
                        <a href='#'>
                            <BaseButton
                                type="submit"
                                text={data[key]}
                                onClick={() => changePrimaryKeyValue(data[primaryKey])}
                            />
                        </a>
                    </form>
                </TableCell>
            )
        } else if(key === 'edit') {
            return (
                <TableCell>
                    <form onSubmit={(e) => handleSubmit(e, editUrl)}>
                        <a href='#'>
                            <BaseButton
                                type="submit"
                                text="編集"
                                onClick={() => changePrimaryKeyValue(data[primaryKey])}
                            />
                        </a>
                    </form>
                </TableCell>
            )
        } else if(key === 'delete') {
            return (
                <TableCell>
                    <form onSubmit={(e) => handleSubmit(e, deleteUrl)}>
                        <a href='#'>
                            <BaseButton
                                type="submit"
                                text="削除"
                                onClick={() => changePrimaryKeyValue(data[primaryKey])}
                            />
                        </a>
                    </form>
                </TableCell>
            )
        } else {
            return (
                <TableCell>
                    {data[key]}
                </TableCell>
            )
        }
    }

    return (
        <>
        {keys.map((key, index) => (
            getTableCell(index, key)
        ))}
        </>
    )
}

export default TableCellList;