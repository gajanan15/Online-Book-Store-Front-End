import React, {Component} from 'react';
import '../../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import Login from '../../asset/login.png'

class SignUp extends Component {

    constructor(props) {
        super(props);
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
                </div>
            </div>
        );
    }
}

export default SignUp;
