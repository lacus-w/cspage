import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
//import Demo from './Demo';
import LabTable from './LabTable';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <LabTable />
    </StyledEngineProvider>
  </React.StrictMode>
);
