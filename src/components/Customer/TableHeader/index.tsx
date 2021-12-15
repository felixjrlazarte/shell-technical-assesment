import * as React from 'react';

// Components
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

// Icons
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ICustomer, IHeader, ITableHeader } from '../interfaces';
import { StyledTableHeader, StyledTableCell } from '../style';

const Header: readonly IHeader[] = [
  {
    id: 'name',
    numeric: false,
    label: 'NAME',
  },
  {
    id: 'description',
    numeric: false,
    label: 'DESCRIPTION',
  },
  {
    id: 'rate',
    numeric: true,
    label: 'RATE',
  },
  {
    id: 'balance',
    numeric: true,
    label: 'BALANCE',
  },
  {
    id: 'deposit',
    numeric: true,
    label: 'DEPOSIT',
  },
  {
    id: 'status',
    numeric: false,
    label: 'STATUS',
  },
  {
    id: 'action',
    numeric: false,
    label: <MoreHorizIcon />,
  },
];

const CustomerTableHeader = (props: ITableHeader) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  
  const createSortHandler = (property: keyof ICustomer) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableHeader>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </StyledTableCell>
        {Header.map(({ id, numeric, label }) => (
          <StyledTableCell key={id} align={numeric ? 'right' : 'left'} padding="normal" sortDirection={orderBy === id ? order : false} >
            <TableSortLabel active={orderBy === id} direction={orderBy === id ? order : 'asc'} onClick={createSortHandler(id)} >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden} >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableHeader>
    </TableHead>
  );
}

export default CustomerTableHeader;