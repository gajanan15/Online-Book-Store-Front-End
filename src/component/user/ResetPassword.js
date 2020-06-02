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

    checkPassword = (event,error) => {
        if(this.state.password !== event.target.value){
            this.setState({
                [event.target.id]:"Password Does Not Match",
                [error]: `Invalid ${event.target.name}`,
                errorStatus: true,
            })
        }
        if(this.state.password === event.target.value){
            this.setState({
                [event.target.name]: event.target.value,
                [event.target.id]:" ",
                confirmPasswordError: "",
                errorStatus: false,
            })
        }
        this.setState({
            [event.target.name]: event.target.value,
            confirmPasswordError: " ",
            errorStatus: false,
        })
    }

    passwordValidation=(event,error)=>{
        let passwordPattern="^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$"
        if(!event.target.value.match(passwordPattern)){
            this.setState({
                [event.target.id]: "Enter valid password",
                [error]: `Invalid ${event.target.name}`,
                errorStatus: true,
            })
        }
        else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                errorStatus: false,
            })
        }
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
                                                   error={this.state.newPasswordError}
                                                   onChange={this.changeState}
                                                   onBlur={(e)=>this.passwordValidation(e,"newPasswordError")}
                                                   helperText={this.state.new}
                                        />

                                        <TextField id="confirm"
                                                   name="confirmPassWord"
                                                   label="Confirm Password"
                                                   variant="outlined"
                                                   type="password"
                                                   value={this.state.confirmPassWord}
                                                   fullWidth required autoComplete="off"
                                                   error={this.state.confirmPasswordError}
                                                   onChange={(e)=>this.checkPassword(e,"confirmPasswordError")}
                                                   onBlur={(e)=>this.passwordValidation(e,"confirmPasswordError")}
                                                   helperText={this.state.confirm}
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
                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }
            </div>
        );
    }
}

export default ResetPassword;