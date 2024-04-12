import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store.js';
import { useDispatch, useSelector } from 'react-redux';



ReactDOM.render(<Provider store={store}>
    <h1>Skill Swap</h1>
    </Provider>,
  document.getElementById('root')
);