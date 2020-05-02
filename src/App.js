import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CbHeader from './Component/CbHeader'
import CbFooter from './Component/CbFooter'
import AdminPage from './Component/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={AdminPage} exact={true} />
      </Switch>  
    </BrowserRouter>
  );
}

export default App;
