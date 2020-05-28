import React from 'react';
import {Route, Switch } from 'react-router-dom';
import AdminPage from '../component/admin/AdminPage';
import HomePage from "../component/user/HomePage";
import Cart from "../component/user/Cart";
import SignUp from "../component/user/SignUp";
import OrderSuccessful from "../component/user/OrderSuccessful";

class RouterComponent extends React.Component {
constructor(props) {
    super(props);
}

    render() {
        return (
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                 <Route path="/admin" component={AdminPage} exact={true} />
                <Route path={"/cart"} component={Cart} exact={true}/>
                <Route path={"/orders/successful/:random"} component={OrderSuccessful} exact/>
                <Route path={"/user/login"} component={SignUp} exact/>
             </Switch>
        );
    }
}

export default RouterComponent;