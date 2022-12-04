import React from 'react';

import App from './App';

import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

import "./styles/index.scss";

createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <App/>
        </Provider>
    </React.StrictMode>
);