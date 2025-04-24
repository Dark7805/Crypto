import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import CryptoTable from './features/CryptoTable';
import './styles/Table.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <div className="content-wrapper">
          <h1 className="page-title">Crypto Price Tracker</h1>
          <CryptoTable />
        </div>
      </div>
    </Provider>
  );
}

export default App;