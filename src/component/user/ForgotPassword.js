import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CbHeader from "../utils/CbHeader";
import '../../css/ForgotPassword.css'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            forgetEmailId:' ',
            forgetEmailError:'',
            forgetEmailID:"",
            error:'',
            errorStatus:false,
            emailID:"",
            snackFlag: false,
            severity: "error",
            snackMessage: ""
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    routeChange = () => {
        this.props.history.push("/user/login")
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
                    <CbHeader/>
                    <div className="forgotmain">
                    <div id="forgotdiv">
                        <h1>Forgot Your Password?</h1>
                        <Card id="forgotpasswordcart" variant="outlined">
                            <CardContent>
                                <div id="resetContent">
                                    <Typography id="typo" color="textSecondary">
                                        Enter your email address and we'll send you a link to reset your password.
                                    </Typography>
                                    <div id="forgotEmailText">
                                        <ThemeProvider theme={theme}>
                                        <TextField id="forgetEmailId"
                                                   name="emailID"
                                                   label="Email Id"
                                                   variant="outlined"
                                                   value={this.state.emailID}
                                                   fullWidth required autoComplete="off"
                                                   onChange={this.changeState}
                                        />
                                        </ThemeProvider>
                                    </div>
                                    <div>
                                        <Button id="resetbtn">Submit</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div id="createbtn" onclick={this.routeChange}>
                            <Button>Create Account </Button>
                        </div>
                    </div>
                    </div>
                </div>
        );
    }
}

export default withRouter(ForgotPassword);