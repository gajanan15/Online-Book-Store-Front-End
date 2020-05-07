import React from 'react';
import {Route, Switch } from 'react-router-dom';
import AdminPage from '../component/admin/AdminPage';

class RouterComponent extends React.Component {
constructor(props) {
    super(props);

}

    render() {
        return (
            <Switch>
                 <Route path="" component={AdminPage} exact={true} />
             </Switch>
        );
    }
}

export default RouterComponent;