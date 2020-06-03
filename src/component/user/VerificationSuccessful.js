import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import CbHeader from "../utils/CbHeader";
import Container from "@material-ui/core/Container";
import "../../css/VerificationSuccessful.css"
import CbFooter from "../utils/CbFooter";
import {AdminService} from "../../service/AdminService";

class VerificationSuccessful extends Component {

    routeChange = () => {
        this.props.history.push("/user/login")
    }

    render() {
        return (
            <div>
                <CbHeader/>
                <Container className="verificationdiv">
                    <img src={require("../../asset/verified-icon.png")} alt={"Verified"} id="verificationimg"/>
                    <Typography variant="body2" color="textSecondary" component="p" id="verificationtypo">Congratulations! Your email address has been verified.</Typography>
                    <div className="loginverificationdiv">
                        <button id="loginverificationbtn" onClick={this.routeChange}>Login</button>
                    </div>
                </Container>
                <CbFooter/>
            </div>
        );
    }
}

export default VerificationSuccessful;