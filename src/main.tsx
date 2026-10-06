import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { store } from './store/store';
import App from './App';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#EDF2FF',
      '#DBE4FF',
      '#BAC8FF',
      '#91A7FF',
      '#748FFC',
      '#5C7CFA',
      '#4C6EF5',
      '#4263EB',
      '#3B5BDB',
      '#364FC7',
    ],
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
