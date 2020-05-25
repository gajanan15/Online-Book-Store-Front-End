import React, {Component} from 'react';
import '../../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import Login from '../../asset/login.png'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SignUp;
