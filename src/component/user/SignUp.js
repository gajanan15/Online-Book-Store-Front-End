import React, {Component} from 'react';
import '../../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import Login from '../../asset/login.png'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailID: '',
            password: '',
            fullname: '',
            phoneNumber: '',
            loginChecked: true,
            signupChecked: false
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

    render() {
        return (
            <div className="hero" style={{background: "#b3b3b3"}}>
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
                                    <div className="sign-up-htm">
                                            <div className="group">
                                                <TextField id="fullName"
                                                           name="fullname"
                                                           label="Full Name"
                                                           variant="outlined"
                                                           value={this.state.fullname}
                                                           fullWidth required autoComplete="off"
                                                           onChange={this.changeState}
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
                                                />
                                            </div>
                                            <div className="group">
                                                <button className="login-button">Sign
                                                    Up
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SignUp;
