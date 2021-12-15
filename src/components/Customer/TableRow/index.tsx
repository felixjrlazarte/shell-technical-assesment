import React from 'react';

// components
import Checkbox from '@mui/material/Checkbox';

// Styled components
import { StatusContainer, StyledTableRow, StyledTableCell, CustomerId, 
  CustomerName, Currency, Balance } from '../style';

import { ICustomerRow } from '../interfaces';

const CustomerTableRow = (props: ICustomerRow) => {
  const { customer, index, selected, handleClick, handleDelete } = props;

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const isItemSelected = isSelected(customer.name);
  const labelId = `enhanced-table-checkbox-${index}`;

  const onDelete = (event: React.MouseEvent<unknown>) => {
    handleDelete(customer.id);
    event.stopPropagation();
  }

  return (
    <StyledTableRow
      hover
      onClick={(event) => handleClick(event, customer.name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={customer.name}
      selected={isItemSelected}
    >
      <StyledTableCell padding="checkbox">
        <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </StyledTableCell>
      <StyledTableCell component="th" id={labelId} scope="row" width="16%">
        <CustomerName>{customer.name}</CustomerName>
        <CustomerId>{customer.id}</CustomerId>
      </StyledTableCell>
      <StyledTableCell>{customer.description}</StyledTableCell>
      <StyledTableCell align="right">
        {customer.rate}
        <Currency>INR</Currency>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Balance remainingbalance={customer.balance}>{customer.balance}</Balance>
        <Currency>INR</Currency>
      </StyledTableCell>
      <StyledTableCell align="right">
        {customer.deposit}
        <Currency>INR</Currency>
      </StyledTableCell>
      <StyledTableCell align="center">
        <StatusContainer status={customer.status}>{customer.status}</StatusContainer>
      </StyledTableCell>
      <StyledTableCell align="right" onClick={ onDelete }>{customer.action}</StyledTableCell>
    </StyledTableRow>
  );
}

export default CustomerTableRow;