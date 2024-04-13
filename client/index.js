import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store.js';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import Ashraf_Test_Component from './ashraf_test_component.js';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <Ashraf_Test_Component/> */}
    <App />
    </Provider>
);