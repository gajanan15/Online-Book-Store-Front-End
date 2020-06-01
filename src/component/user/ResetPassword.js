import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CbHeader from "../utils/CbHeader";
import '../../css/ForgotPassword.css'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            newPasswordError:"",
            confirmPassword:' ',
            confirmPassWord:'',
            confirmPasswordError:"",
            error:'',
            errorStatus:false,
            password:"",
            passWord:" ",
            snackFlag: false,
            severity: "error",
            snackMessage: "",
            new:" ",
            confirm:" "

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
                <CbHeader/>
                <div className="forgotmain">
                    <div id="forgotdiv">
                        <h1>Reset Your Password</h1>
                        <Card id="resetcard" variant="outlined">
                            <CardContent>
                                <div id="resetContent">
                                    <div id="resetPassword">
                                            <TextField id="new"
                                                       name="password"
                                                       label="New Password"
                                                       variant="outlined"
                                                       type="password"
                                                       value={this.state.password}
                                                       fullWidth required autoComplete="off"
                                                       onChange={this.changeState}
                                            />

                                            <TextField id="confirm"
                                                       name="confirmPassWord"
                                                       label="Confirm Password"
                                                       variant="outlined"
                                                       type="password"
                                                       value={this.state.confirmPassWord}
                                                       fullWidth required autoComplete="off"
                                            />
                                    </div>
                                    <div>
                                        <Button id="resetbtn">Reset Password</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;