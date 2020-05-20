import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CbFooter from "../utils/CbFooter";
import CbHeader from "../utils/CbHeader";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {AdminService} from "../../service/AdminService";
import CartItems from "./CartItems";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextFields from '../utils/CustomTextFields'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            btn1: "visible",
            btn2: "visible",
            a: "hidden",
            text: false,
            count: 1,
            checkoutData: [],
            changedCount: '',
            customerPanel: false,
            summaryPanel: false,
            customerName: "", mobileNo: "", pincode: "", locality: "", address: "", city: "", landmark: "", email: "",
            name: " ", contact: " ", pinCode: " ", locaLity: " ", addRess: " ", ciTy: " ", landMark: " ", Email: " ",
            nameError: "", numberError: "", pincodeError: "", localityError: "", addressError: "", cityError: "",
            landmarkError: "", emailError: "", err: "",
            btnDisable: false,
            color: "grey",

        }
    }

    componentDidMount() {
        this.handleCart()
    }

    handleCart = () => {
        new AdminService().myCart().then(response => {
            console.log("in")
            console.log(response.data)
            this.setState({
                checkoutData: response.data
            })
        }).catch((error) => {
            console.log(error)
            this.setState({
                checkoutData: []
            })
        })
    }

    handleCustomer = () => {
        this.myTextField.focus();
        this.setState({
            customerPanel: true,
            btn1: "hidden",
            disableFlag: true
        })
        this.state.disableFlag = true
    }

    handleFocus = () => {
        this.myTextField.focus();
        this.setState({
            text: false,
            btn2: true,
            a:"hidden"
        })
    }

    handleSummary = () => {
        this.setState({
            summaryPanel: true,
            btn2: "hidden",
            a: "visible",
            text: true,
            disableFlag: true
        })
        this.state.disableFlag = true
        this.buttonVisibility()
    }

    formCheck() {
        return this.state.customerName.trim().length > 0 && this.state.mobileNo.trim().length > 0 && this.state.pincode.trim().length > 0 && this.state.locality.trim().length > 0 &&
            this.state.address.trim().length > 0 && this.state.city.trim().length > 0 && this.state.landmark.trim().length > 0 && this.state.email.trim().length > 0;
    }

    errorCheck() {
        return this.state.name.trim().length === 0 && this.state.contact.trim().length === 0 && this.state.pinCode.trim().length === 0 && this.state.locaLity.trim().length === 0 &&
            this.state.addRess.trim().length === 0 && this.state.ciTy.trim().length === 0 && this.state.landMark.trim().length === 0 && this.state.Email.trim().length === 0;
    }

    buttonVisibility() {
        if (this.errorCheck() && this.formCheck()) {
            this.setState({
                color: "maroon",
                btnDisable: false
            })
        } else {
            this.setState({
                color: "grey",
                btnDisable: true
            })
        }
    }

    nameValidation = (event, error) => {
        let namePattern = "^[A-Za-z. ]+[ ]*[A-Za-z.]*$"
        if (!event.target.value.match(namePattern)) {
            this.setState({
                [event.target.id]: "Please enter valid name",
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

    phoneNumberValidation = (event, error) => {
        let phoneNumberPattern = "^[1-9]{1}[0-9]{9}$"
        if (!event.target.value.match(phoneNumberPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid phone number",
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

    localityValidation = (event, error) => {
        let localityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(localityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid location",
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

    pincodeValidation = (event, error) => {
        let pincodePattern = "^[1-9]{1}[0-9]{2}[-]{0,1}[0-9]{3}$"
        if (!event.target.value.match(pincodePattern)) {
            this.setState({
                [event.target.id]: "Please enter a valid 6 digits zip code",
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

    addressValidation = (event, error) => {
        let addressPattern = "^\\w{1,150}"
        if (!event.target.value.match(addressPattern)) {
            this.setState({
                [event.target.id]: "Please enter Address between 150 character",
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

    cityValidation = (event, error) => {
        let cityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(cityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid city name",
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
                [event.target.id]: "Please enter valid email address",
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

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.buttonVisibility()
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        let cartData = this.state.checkoutData
        return (
            <div>
                <CbHeader/>
                <Container id="cartcontainer" maxWidth="md">
                    <Card className={cartData.length === 1 ? "bookdiv1" : "bookdiv"} variant="outlined">
                        <h4>My Cart ({cartData.length})</h4>
                        <div className={cartData.length <= 2 ? "no-scroll" : "scrollbar"}>
                            {
                                cartData.length > 0 ? cartData.map((books, index) => {
                                    return <CartItems flag={this.state.disableFlag} handleSummary={this.setTotalValue}
                                                      key={books.id}
                                                      cartData={cartData} handleCart={this.handleCart}
                                                      books={books} index={index}/>
                                }) : <div className="nocartitems">
                                    <img className="noitemsimage" src={require("../../asset/emptyCart.png")}
                                         alt="Cart Is Empty"/>
                                    <h3 id="emptycart">Please Add Books To Cart</h3>

                                </div>
                            }
                        </div>
                        <Button onClick={this.handleCustomer}
                                style={cartData.length === 0 ? {visibility: "hidden"} : {visibility: this.state.btn1}}
                                id="orderBtn">
                            Continue
                        </Button>
                    </Card>
                    <ExpansionPanel className="customerdetails" variant="outlined" expanded={this.state.customerPanel}>
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="summary"
                        >
                            <Typography id="customer-details">Customer Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Button id="editBtn" onClick={this.handleFocus}
                                    style={{visibility: this.state.a}}>Edit</Button>
                            <div className="customerdiv">
                                <div className="textbox secondtext">
                                    <ThemeProvider theme={theme}>
                                        <TextFields
                                            required={true}
                                            inputRef={(e) => (this.myTextField = e)}
                                            label="Name"
                                            error={this.state.nameError}
                                            id="name"
                                            name="customerName"
                                            onChange={this.changeState}
                                            variant="outlined"
                                            onBlur={(e) => this.nameValidation(e, "nameError")}
                                            helperText={this.state.name}
                                            className="textfields" disabled={this.state.text}
                                        />
                                        <TextFields
                                            required={true}
                                            label="Phone Number"
                                            error={this.state.numberError}
                                            id="contact"
                                            name="mobileNo"
                                            onChange={this.changeState}
                                            onBlur={(e) => this.phoneNumberValidation(e, "numberError")}
                                            helperText={this.state.contact}
                                            variant="outlined"
                                            className="textfields" disabled={this.state.text}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div className="textbox secondtext">
                                    <TextFields
                                        required={true}
                                        label="Pincode"
                                        id="pinCode"
                                        error={this.state.pincodeError}
                                        name="pincode"
                                        onChange={this.changeState}
                                        onBlur={(e) => this.pincodeValidation(e, "pincodeError")}
                                        helperText={this.state.pinCode}
                                        variant="outlined"
                                        className="textfields" disabled={this.state.text}
                                    />
                                    <TextFields
                                        required={true}
                                        label="Locality"
                                        id="locaLity"
                                        error={this.state.localityError}
                                        name="locality"
                                        onChange={this.changeState}
                                        onBlur={(e) => this.localityValidation(e, "localityError")}
                                        helperText={this.state.locaLity}
                                        variant="outlined"
                                        className="textfields" disabled={this.state.text}
                                    />
                                </div>
                                <div className="address">
                                    <TextFields
                                        required={true}
                                        style={{marginTop: "2%"}}
                                        multiline rows={2} fullWidth inputProps={{maxLength: 150}}
                                        label="Address"
                                        id="addRess"
                                        error={this.state.addressError}
                                        name="address"
                                        onChange={this.changeState}
                                        onBlur={(e) => this.addressValidation(e, "addressError")}
                                        helperText={this.state.addRess}
                                        placeholder={"Max 150 words"}
                                        variant="outlined"
                                        className="textfields1" disabled={this.state.text}
                                    />
                                </div>

                                <div className="customer-email">
                                    <TextFields
                                        required={true}
                                        type="email"
                                        style={{marginTop: "2%"}}
                                        label="Email"
                                        id="Email"
                                        error={this.state.emailError}
                                        name="email"
                                        onChange={this.changeState}
                                        onBlur={(e) => this.emailValidation(e, "emailError")}
                                        helperText={this.state.Email}
                                        variant="outlined"
                                        className="textfields1" disabled={this.state.text}
                                    />
                                </div>


                                <div className="secondtext">
                                    <TextFields
                                        required={true}
                                        label="City/Town"
                                        id="ciTy"
                                        error={this.state.cityError}
                                        name="city"
                                        onChange={this.changeState}
                                        onBlur={(e) => this.cityValidation(e, "cityError")}
                                        helperText={this.state.ciTy}
                                        variant="outlined"
                                        className="textfields" disabled={this.state.text}
                                    />
                                    <TextFields
                                        label="Landmark"
                                        id="landMark"
                                        name="landmark"
                                        variant="outlined"
                                        onChange={this.changeState}
                                        className="textfields" disabled={this.state.text}
                                    />
                                </div>
                                <div className="radiodiv">
                                    <Typography id="type-name">Type</Typography>
                                    <RadioGroup row aria-label="Type" name="position" defaultValue="top">
                                        <FormControlLabel
                                            value="top"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Home"
                                            labelPlacement="end" disabled={this.state.text}
                                        />
                                        <FormControlLabel
                                            value="start"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Work"
                                            labelPlacement="end" disabled={this.state.text}
                                        />
                                        <FormControlLabel
                                            value="end"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Other"
                                            labelPlacement="end" disabled={this.state.text}
                                        />
                                    </RadioGroup>

                                    <Button onClick={this.handleSummary} id="customerBtn"
                                            disabled={this.state.btnDisable}
                                            style={{backgroundColor: this.state.color,visibility: this.state.btn2}}>
                                        Continue
                                    </Button>


                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className="ordersummary" variant="outlined" expanded={this.state.summaryPanel}>
                        <ExpansionPanelSummary aria-controls="panel1a-content" id="details">
                            <Typography id="customer-details">Order Summary</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="detailsblock" style={{marginLeft: "1%", width: "100%"}}>
                                <div>
                                    <div>
                                        <div style={{display: "flex", marginTop: "-2%"}}>
                                            <div>
                                                <img src={require("../../asset/becham.jpg")} className="img"/>
                                            </div>
                                                    <div style={{marginLeft: "1%", marginTop: "2%"}}>
                                                        <Typography id="summary-bookname"
                                                                    component="h2">The Beckham Experiment</Typography>
                                                        <Typography variant="body2" color="textSecondary"
                                                                    id="summary-authorname">Grant Wahl</Typography>
                                                        <Typography component="h2"
                                                                    id="summary-cost">Rs.1000</Typography>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                </div>
                                <Button id="summryBtn">
                                    Place Order
                                </Button>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </Container>
                <CbFooter/>
            </div>
        );
    }
}

export default Cart;