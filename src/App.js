import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouterComponent from './router/RouterComponent';
import CbFooter from "./component/utils/CbFooter";

function App() {
    return (
        <BrowserRouter>
            <RouterComponent/>
            <CbFooter/>
        </BrowserRouter>
    );
}

export default App;
