export type TOrder = 'asc' | 'desc';

export type TStatus = { status: string }

export type TBalance = { remainingbalance: string }

export interface ICustomer {
  id: number;
  name: string;
  description: string;
  rate: string;
  balance: string;
  deposit: string;
  status: string
  action: any;
}

export interface IHeader {
  id: keyof ICustomer;
  label: any;
  numeric: boolean;
}

export interface ITableHeader {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ICustomer) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: TOrder;
  orderBy: string;
  rowCount: number;
}

export interface ISearchbar {
  setSearchKeyValue: (s: string) => void;
}

export interface ICustomerRow {
  customer: ICustomer,
  index: number,
  selected: readonly string[],
  handleClick: (event: any, name: string) => void,
  handleDelete: any,
}

export interface IConfirmDelete {
  open: boolean,
  handleClose: () => void,
  handleDelete: () => void,
}