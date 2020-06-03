import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {withRouter} from 'react-router';
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state={
            emailId:' ',
            passWord:' ',
            emailError:'',
            passwordError:'',
            emailID:"",
            password:"",
            error:'',
            err:false,
        }
    }

    emailValidation=(event,error)=>{
        let emailPattern="^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$"
        if(!event.target.value.match(emailPattern)){
            this.setState({
                [event.target.id]: "Enter valid email id",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        }
        else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    passwordValidation=(event,error)=>{
        let passwordPattern="^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$"
        if(!event.target.value.match(passwordPattern)){
            this.setState({
                [event.target.id]: "Enter valid password",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        }
        else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    userLogin=()=>{
        const loginData={
            emailID:this.state.emailID,
            password:this.state.password,
        }

        const loginOrLogout =  window.location.href.includes('/user/login')

        new AdminService().login(loginData).then(response=>{
            let severity=response.data==="LOGIN SUCCESSFUL" ? "success" : "error"
            severity === "success"? this.props.snack(response.data,severity): this.props.snack(response.data.message,severity);
            severity === "success"?localStorage.setItem('Authorization',response.headers.authorization) : localStorage.setItem('Authorization',"null")
            this.clear(severity)
            !loginOrLogout ? window.location.reload(true) : this.clear(severity)
        }).catch(error=>{
            console.log(error)
        })
    }

    clear=(severity)=>{
        if(severity === "success")
        {
            setTimeout(() => {
                this.setState({
                    emailId:' ',
                    passWord:' ',
                    emailError:'',
                    passwordError:'',
                    emailID:"",
                    password:"",
                    error:'',
                    err:false,
                    snackFlag: false, snackMessage: "",severity:'success'
                },()=>this.props.history.push(`/`))
            }, 3000);
        }
        if(severity === "error"){
            setTimeout(() => {
                this.setState({
                    snackFlag: false, snackMessage: "",severity:'error'
                })
            }, 3000);
        }
    }


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        return (
            <div>
                <div className="sign-in-htm">
                    <ThemeProvider theme={theme}>
                        <div className="group1">
                            <TextField id="emailId"
                                       name="emailID"
                                       label="Email Id"
                                       variant="outlined"
                                       value={this.state.emailID}
                                       fullWidth required autoComplete="off"
                                       onChange={this.changeState}
                                       error={this.state.emailError}
                                       onBlur={(e)=>this.emailValidation(e,"emailError")}
                                       helperText={this.state.emailId}
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
                                       error={this.state.passwordError}
                                       onBlur={(e)=>this.passwordValidation(e,"passwordError")}
                                       helperText={this.state.passWord}
                                       />
                        </div>
                        <div className="foot-lnk">
                            <a href="/forgot/password">Forgot Password?</a>
                        </div>
                        <div className="group1">
                            <button className="login-button" onClick={this.userLogin}>Login</button>
                        </div>
                    </ThemeProvider>
                </div>
                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity} />
                }
            </div>
        );
    }
}
export default withRouter(SignIn);