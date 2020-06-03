import React, {Component} from 'react';
import '../../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import Login from '../../asset/login.png'
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";
import SignIn from '../user/SignIn';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: ' ',
            emailID: '',
            password: '',
            passWord: ' ',
            fullname: '',
            fullName: ' ',
            number: ' ',
            phoneNumber: '',
            emailError: '',
            passwordError: '',
            nameError: '',
            numberError: '',
            error: '',
            err: false,
            loginChecked: true,
            signupChecked: false,
            snackFlag: false, snackMessage: "", severity: 'success'
        }
    }

    fullNameValidation = (event, error) => {
        let fullNamePattern = "^.{3,50}$"
        if (!event.target.value.match(fullNamePattern)) {
            this.setState({
                [event.target.id]: "Enter valid name",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    emailValidation = (event, error) => {
        let emailPattern = "^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$"
        if (!event.target.value.match(emailPattern)) {
            this.setState({
                [event.target.id]: "Enter valid email id",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    passwordValidation = (event, error) => {
        let passwordPattern = "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$"
        if (!event.target.value.match(passwordPattern)) {
            this.setState({
                [event.target.id]: "Enter valid password",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    numberValidation = (event, error) => {
        let phoneNumberPattern = "^([6-9]{1}[0-9]{9})$"
        if (!event.target.value.match(phoneNumberPattern)) {
            this.setState({
                [event.target.id]: "Enter valid phone number",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    handleTabSelection = ({target}) => {
        if ([target.name].includes("login")) {
            this.setState({loginChecked: true, signupChecked: false})
        }
        if ([target.name].includes("signup")) {
            this.setState({loginChecked: false, signupChecked: true})
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    userRegistration = () => {
        const registerData = {
            fullName: this.state.fullname,
            emailID: this.state.emailID,
            password: this.state.password,
            mobileNumber: this.state.phoneNumber
        }

        new AdminService().register(registerData).then(response => {
            let severity = response.data.message === "Verification Mail Has Been Sent Successfully" ? "success" : "error"
            severity === "success" ? this.snackStateMessage(response.data.message, severity) : this.snackStateMessage(response.data.message, severity);
            this.clear()
        }).catch(error => {
            console.log(error)
        })

    }

    clear = () => {
        if (this.state.severity === "success") {
            setTimeout(() => {
                this.setState({
                    emailId: ' ',
                    emailID: '',
                    password: '',
                    passWord: ' ',
                    fullname: '',
                    fullName: ' ',
                    number: ' ',
                    phoneNumber: '',
                    emailError: '',
                    passwordError: '',
                    nameError: '',
                    numberError: '',
                    error: '',
                    err: false,
                    loginChecked: true,
                    signupChecked: false,
                    snackFlag: false, snackMessage: "", severity: 'success'
                })
            }, 3000);
        } else {
            setTimeout(() => {
                this.setState({
                    snackFlag: false, snackMessage: "", severity: 'error'
                })
            }, 3000);
        }
    }

    snackStateMessage = (response, severityLevel) => {
        this.setState({
            snackMessage: response,
            snackFlag: true,
            severity: severityLevel,
        },()=>this.clear())
    }


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        const loginOrLogout = window.location.href.includes('/user/login')
        return (
            <div className="hero" style={loginOrLogout ? {background: "#b3b3b3"} : {background: "transparent"}}>
                <div className="user-login-form">
                    <Card className="form-box" style={{borderRadius: "5%", backgroundColor: "#f2f2f2"}}>
                        <img src={Login} alt="Not found" className="login-img"/>
                        <div style={{marginLeft: "76px", marginTop: "3%"}}>
                            <h3 style={{fontWeight: "bold"}}>
                                THE CB'S BOOK STORE
                            </h3>
                        </div>
                    </Card>

                    <Card className="login-box" style={{borderRadius: "2%", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.5)"}}>
                        <div className="login-wrap">
                            <div className="login-html">
                                <input id="tab-1" type="radio" name="login" className="sign-in"
                                       checked={this.state.loginChecked} onClick={this.handleTabSelection}/><label
                                htmlFor="tab-1" className="tab1">Login</label>
                                <input id="tab-2" type="radio" name="signup" className="sign-up"
                                       checked={this.state.signupChecked} onClick={this.handleTabSelection}/>
                                <label htmlFor="tab-2" className="tab2">SignUp</label>
                                <div className="login-form">
                                    <SignIn snack={this.snackStateMessage}/>
                                    <div className="sign-up-htm">
                                        <ThemeProvider theme={theme}>
                                            <div className="group">
                                                <TextField id="fullName"
                                                           name="fullname"
                                                           label="Full Name"
                                                           variant="outlined"
                                                           value={this.state.fullname}
                                                           fullWidth required autoComplete="off"
                                                           onChange={this.changeState}
                                                           error={this.state.nameError}
                                                           onBlur={(e) => this.fullNameValidation(e, "nameError")}
                                                           helperText={this.state.fullName}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField id="emailId"
                                                           name="emailID"
                                                           label="Email Id"
                                                           variant="outlined"
                                                           value={this.state.emailID}
                                                           fullWidth required autoComplete="off"
                                                           onChange={this.changeState}
                                                           error={this.state.emailError}
                                                           onBlur={(e) => this.emailValidation(e, "emailError")}
                                                           helperText={this.state.emailId}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField id="passWord"
                                                           name="password"
                                                           label="Password"
                                                           value={this.state.password}
                                                           type="password"
                                                           variant="outlined"
                                                           fullWidth required autoComplete="off"
                                                           onChange={this.changeState}
                                                           error={this.state.passwordError}
                                                           onBlur={(e) => this.passwordValidation(e, "passwordError")}
                                                           helperText={this.state.passWord}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField id="number"
                                                           name="phoneNumber"
                                                           label="Phone Number"
                                                           value={this.state.phoneNumber}
                                                           variant="outlined"
                                                           fullWidth required autoComplete="off"
                                                           onChange={this.changeState}
                                                           error={this.state.numberError}
                                                           onBlur={(e) => this.numberValidation(e, "numberError")}
                                                           helperText={this.state.number}

                                                />
                                            </div>
                                            <div className="group">
                                                <button className="login-button" onClick={this.userRegistration}>Sign
                                                    Up
                                                </button>
                                            </div>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }
            </div>
        );
    }
}

export default SignUp;
