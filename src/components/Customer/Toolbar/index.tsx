import * as React from 'react';

// components
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@mui/material/TextField';

// styles
import { StyledToolbar } from '../style';
import { ISearchbar } from '../interfaces';

const Searchbar = (props: ISearchbar) => {
  const { setSearchKeyValue } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyValue(event.target.value);
  };

  return (
  <StyledToolbar>
    <TextField
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      onChange={ handleOnChange }
    />
  </StyledToolbar>
)};

export default Searchbar;