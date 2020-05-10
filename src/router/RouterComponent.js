import React from 'react';
import {Route, Switch } from 'react-router-dom';
import AdminPage from '../component/admin/AdminPage';
import HomePage from "../component/user/HomePage";

class RouterComponent extends React.Component {
constructor(props) {
    super(props);

}

    render() {
        return (
            <Switch>
                <Route path="" component={HomePage} exact={true} />
                 <Route path="/admin" component={AdminPage} exact={true} />
             </Switch>
        );
    }
}

export default RouterComponent;