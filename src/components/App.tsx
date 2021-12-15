import * as React from 'react';
import Container from '@mui/material/Container';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Customer from "./Customer";

const App = () => {
  return (
    <React.Fragment>
      <Container fixed className="App">
        <Customer />
      </Container>
    </React.Fragment>
  );
}

export default App;
