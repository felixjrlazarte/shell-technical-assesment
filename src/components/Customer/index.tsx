import React, { useState } from 'react';

// Table Related Component
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Icons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Styled components
import { StyledTableRow, ActiveCustomers, PaginationContainer } from './style';
import { ICustomer, TOrder } from './interfaces';

import CustomerData from '../../data/customers.json';
import Searchbar from './Toolbar';
import CustomerTableHeader from './TableHeader';
import CustomerTableRow from './TableRow';
import ConfirmDelete from './ConfirmDelete';

const customers = CustomerData.customers.map((customer) => ({
  id: customer.id,
  description: customer.description,
  rate: customer.rate,
  balance: customer.balance,
  deposit: customer.deposit,
  status: customer.status,
  name: `${customer.firstName} ${customer.lastName}`,
  action: <IconButton><DeleteIcon /></IconButton>
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: TOrder,
  orderBy: any,
): (
  a: { [key in Key]: any },
  b: { [key in Key]: any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const CustomerTable = () => {
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof ICustomer>('name');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchKeyValue, setSearchKeyValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState(customers);

  const activeCustomers = data.filter(customer => customer.status === 'active').length;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredData = data.filter(({ name, description }) => {
    const keyword = searchKeyValue.toLowerCase();

    return name.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword);
  });

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof ICustomer,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    const newData = data.filter(val => val.id !== deleteId);

    setData(newData);
    setDeleteId(null);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 3 }}>
        <Searchbar setSearchKeyValue={ setSearchKeyValue } />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium" >
            <CustomerTableHeader
              numSelected={ selected.length }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              rowCount={ data.length } />

            <TableBody>
              { filteredData.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <CustomerTableRow
                    key={row.name}
                    customer={ row }
                    index={ index }
                    selected={ selected }
                    handleClick={ handleClick }
                    handleDelete={ setDeleteId }
                  />
                ))}
              { emptyRows > 0 && 
                <StyledTableRow style={{ height: 53 * emptyRows }} >
                  <TableCell colSpan={8} />
                </StyledTableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>

        <PaginationContainer>
          <ActiveCustomers>
            ACTIVE CUSTOMERS: <strong>{activeCustomers}</strong>/{data.length}
          </ActiveCustomers>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </PaginationContainer>

        <ConfirmDelete
          open={ deleteId !== null }
          handleClose={ () => setDeleteId(null) }
          handleDelete={ handleDelete }
        />
      </Paper>
    </Box>
  );
}

export default CustomerTable;