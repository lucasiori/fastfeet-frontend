import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import history from './services/history';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer
            autoClose={3000}
            transition={Zoom}
            toastClassName="toast-container"
            progressClassName="toast-progressbar"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
