import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import axios from "axios";
import * as serviceWorker from './serviceWorker';
import App from "./components/App";

import store from "./store";

axios.defaults.responseType = "json";
axios.defaults.headers["Content-Type"] = "application/json";

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
