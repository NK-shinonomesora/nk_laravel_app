import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCellList from './tableCellList';

interface BasicTableProps {
  dataList: object[],
  dataKeys: string[],
  listHeader: string[],
  url: string,
  editUrl: string,
  primaryKey: string
}

const BasicTable: React.FC<BasicTableProps> = ({ dataList, dataKeys, listHeader, url, editUrl, primaryKey }) => {
  return (
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                    <TableRow>
                        {listHeader.map((header) => (
                            <TableCell>{header}</TableCell>
                        ))}
                  </TableRow>
              </TableHead>
            <TableBody>
                {dataList.map((data, index) => (
                    <TableRow
                        key={data[dataKeys[index]]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCellList
                        data={data}
                        keys={dataKeys}
                        url={url}
                        editUrl={editUrl}
                        primaryKey={primaryKey}
                    />
                    </TableRow>
                ))}
            </TableBody>
          </Table>
      </TableContainer>
  );
}

export default BasicTable;
