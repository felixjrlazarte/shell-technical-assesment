import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import TableCell from '@mui/material/TableCell';

import { TStatus, TBalance } from './interfaces';

export const StatusContainer = styled('div')<TStatus>(({ status }) => ({
  backgroundColor: status === "active" ? '#1E90FF' : 'transparent',
  color: status === "active" ? '#FFFFFF' : '#A9A9A9',
  border: status !== "active" ? '2px solid #A9A9A9' : 'none',
  textTransform: 'uppercase',
  borderRadius: 40,
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  backgroundColor: '#f3f7fd',
  padding: "15px",
}));

export const StyledTableHeader = styled(TableRow)(() => ({
  backgroundColor: '#f3f7fd',
  border: 'none',
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f3f7fd',
    border: 'none',
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
  color: '#696969'
}));

export const CustomerId = styled('div')({
  fontSize: 12
});

export const CustomerName = styled('div')({
  fontWeight: 500
});

export const Currency = styled('div')({
  fontSize: 12
});

export const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 15px',
});

export const ActiveCustomers = styled('div')({
  fontSize: 13,
  color: '#696969'
});

export const Balance = styled('div')<TBalance>(({ remainingbalance }) => ({
  color: Number(remainingbalance) > 0 ? '#32CD32' : '#FF0000',
}));