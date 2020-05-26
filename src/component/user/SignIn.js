import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {withRouter} from 'react-router';

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
                            <button className="login-button">Login</button>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        );
    }
}
export default withRouter(SignIn);