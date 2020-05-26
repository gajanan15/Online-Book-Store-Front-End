import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";
import {withRouter} from 'react-router';

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state={
            emailID:"",
            password:"",
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {

        return (
            <div>
                <div className="sign-in-htm">
                        <div className="group1">
                            <TextField id="emailId"
                                       name="emailID"
                                       label="Email Id"
                                       variant="outlined"
                                       value={this.state.emailID}
                                       fullWidth required autoComplete="off"
                                       onChange={this.changeState}
                            />
                        </div>
                        <div className="group1">
                            <TextField id="passWord"
                                       name="password"
                                       label="Password"
                                       type="password"
                                       value={this.state.password}
                                       variant="outlined"
                                       fullWidth required autoComplete="off"
                                       onChange={this.changeState}
                                       />
                        </div>
                        <div className="foot-lnk">
                            <a href="/forgot/password">Forgot Password?</a>
                        </div>
                        <div className="group1">
                            <button className="login-button">Login</button>
                        </div>
                </div>
            </div>
        );
    }
}
export default withRouter(SignIn);