import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouterComponent from './RouterComponent';


function App() {
    return (
        <BrowserRouter>
            <RouterComponent/>
        </BrowserRouter>
    );
}

export default App;
