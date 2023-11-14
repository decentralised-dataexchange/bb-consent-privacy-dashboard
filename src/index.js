import React from "react";
import ReactDOM from "react-dom";
//Root CSS
import "./index.css";
//Store
import { store } from './Provider/store';
//i18n
import "localization/i18n";
//App config
import Config from './app.config';
import App from "./App";

export const Init = (config = {}) => {
    const completeConfig = toConfigModal(config);
    if (completeConfig) {
        store.config = completeConfig;
        ReactDOM.render(
            <App />,
            document.getElementById("root")
        );
    }
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

const toConfigModal = (config) => {
    let baseUrl = config.baseUrl;
    if (baseUrl &&
        typeof (baseUrl) === 'string') {
        const configModal = Config(baseUrl);
        return configModal;
    } else {
        console.error('Config format is incorrect');
    }
};
