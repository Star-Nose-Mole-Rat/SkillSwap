import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store.js';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Ashraf_Test_Component from './Ashraf_Test_Component.js';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <Ashraf_Test_Component/> */}
    <App />
    </Provider>
);