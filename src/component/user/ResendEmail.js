import React, {Component} from 'react';
import CbHeader from "../utils/CbHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import '../../css/ForgotPassword.css'

class ResendEmail extends Component {
    constructor(props){
        super(props);
        this.state={
            emailID:""
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
                        <h1>Resend Email</h1>
                        <Card id="forgotcard" variant="outlined">
                            <CardContent>
                                <div id="resetContent">
                                    <Typography id="typo" color="textSecondary">
                                        Enter your email address and we'll send you a email verification link.
                                    </Typography>
                                    <div id="forgotEmailText">
                                            <TextField id="resendEmailId"
                                                       name="emailID"
                                                       label="Email Id"
                                                       variant="outlined"
                                                       value={this.state.emailID}
                                                       fullWidth required autoComplete="off"
                                                       onChange={this.changeState}
                                            />
                                    </div>
                                    <div>
                                        <Button id="resetbtn" style={this.state.emailID === "" ?
                                            {backgroundColor: "#d3d3d3", pointerEvents: "none",color:"black"} :
                                            {backgroundColor: "#a03037"}}>Resend</Button>
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

export default ResendEmail;