import React from 'react';
import {store} from './store.js';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Ashraf_Test_Component from './Ashraf_Test_Component.js';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <Ashraf_Test_Component/> */}
    <App />
    </Provider>
);