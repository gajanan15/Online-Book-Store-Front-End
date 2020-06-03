import React, {Component} from 'react';
import CbHeader from "../utils/CbHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createMuiTheme} from "@material-ui/core/styles";
import '../../css/ForgotPassword.css'
import {AdminService} from "../../service/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";

class ResendEmail extends Component {
    constructor(props){
        super(props);
        this.state={
            resendEmailId:' ',
            resendEmailError:'',
            resendEmailID:"",
            error:'',
            errorStatus:false,
            emailID:"",
            snackFlag: false,
            severity: "error",
            snackMessage: ""
        }
    }

    getVerify=()=>{
        new AdminService().resendMail(this.state.emailID).then(response=>{
            this.setState({
                severity:response.data.message==="Verification Mail Has Been Sent Successfullys" ? "success" : "error",
                snackMessage:response.data.message,
                snackFlag:true,
                emailID:response.data.message==="Verification Mail Has Been Sent Successfully" ? " " : this.state.emailID
            })
        }).catch((error) =>{
            console.log(error)
        })
        this.clear()
    }

    handleButton=()=>{
        window.location.href.includes('forgot')?this.getDetails():this.getVerify()
    }

    getDetails=()=>{
        new AdminService().forgetPassword(this.state.emailID).then(response=>{
            this.setState({
                severity:response.data.message==="Reset Password Link Has Been Sent To Your Email Address" ? "success" : "error",
                snackMessage:response.data.message,
                snackFlag:true,
                emailID:response.data.message==="Reset Password Link Has Been Sent To Your Email Address" ? " " : this.state.emailID
            })
        }).catch((error) =>{
            console.log(error)
        })
        this.clear()
    }

    clear=()=>{
        setTimeout(() => {
            this.setState({
                snackFlag: false,
            })
        }, 2000);
    }


    emailValidation=(event,error)=>{
        let emailPattern="^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$"
        if(!event.target.value.match(emailPattern)){
            this.setState({
                [event.target.id]: "Enter valid email id",
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
                                        <ThemeProvider theme={theme}>
                                            <TextField id="resendEmailId"
                                                       name="emailID"
                                                       label="Email Id"
                                                       variant="outlined"
                                                       value={this.state.emailID}
                                                       fullWidth required autoComplete="off"
                                                       onChange={this.changeState}
                                                       error={this.state.resendEmailError}
                                                       onBlur={(e)=>this.emailValidation(e,"resendEmailError")}
                                                       helperText={this.state.resendEmailId}
                                            />
                                        </ThemeProvider>
                                    </div>
                                    <div>
                                        <Button id="resetbtn" style={this.state.emailID === "" ?
                                            {backgroundColor: "#d3d3d3", pointerEvents: "none",color:"black"} :
                                            {backgroundColor: "#a03037"}} onClick={this.handleButton}>Resend</Button>
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

export default ResendEmail;