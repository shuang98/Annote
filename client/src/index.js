import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from 'react-router-dom';
var Foundation = require('foundation-sites/dist/js/foundation');

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}><App /></Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();


