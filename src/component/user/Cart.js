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


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            btn1: "visible",
            a: "hidden",
            text: false,
            count: 1,
            checkoutData: [],
            changedCount: '',
            customerPanel: false,
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

    render() {
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
                                style={cartData.length < 0 ? {visibility: "hidden"} : {visibility: this.state.btn1}}
                                id="orderBtn">
                            Continue
                        </Button>
                    </Card>
                    <ExpansionPanel className="customerdetails" variant="outlined" expanded={this.state.customerPanel}>
                        <ExpansionPanelSummary aria-controls="panel1a-content" id="summary">
                            <Typography id="customer-details">Customer Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="customerdiv">
                                <div className="textbox secondtext">
                                        <TextFields
                                            required={true}
                                            inputRef={(e) => (this.myTextField = e)}
                                            label="Name"
                                            id="name"
                                            name="customerName"
                                            variant="outlined"
                                            className="textfields"
                                        />
                                        <TextFields
                                            required={true}
                                            label="Phone Number"
                                            id="contact"
                                            name="mobileNo"
                                            variant="outlined"
                                            className="textfields"
                                        />
                                </div>
                                <div className="textbox secondtext">
                                    <TextFields
                                        required={true}
                                        label="Pincode"
                                        id="pinCode"
                                        name="pincode"
                                        variant="outlined"
                                        className="textfields"
                                    />
                                    <TextFields
                                        required={true}
                                        label="Locality"
                                        id="locaLity"
                                        name="locality"
                                        variant="outlined"
                                        className="textfields"
                                    />
                                </div>
                                <div className="address">
                                    <TextFields
                                        required={true}
                                        style={{marginTop: "2%"}}
                                        multiline rows={2} fullWidth inputProps={{maxLength: 150}}
                                        label="Address"
                                        id="addRess"
                                        name="address"
                                        placeholder={"Max 150 words"}
                                        variant="outlined"
                                        className="textfields1"
                                    />
                                </div>

                                <div className="customer-email">
                                    <TextFields
                                        required={true}
                                        type="email"
                                        style={{marginTop: "2%"}}
                                        label="Email"
                                        id="Email"
                                        name="email"
                                        variant="outlined"
                                        className="textfields1"
                                    />
                                </div>
                                <div className="secondtext">
                                    <TextFields
                                        required={true}
                                        label="City/Town"
                                        id="ciTy"
                                        name="city"
                                        variant="outlined"
                                        className="textfields"
                                    />
                                    <TextFields
                                        label="Landmark"
                                        id="landMark"
                                        name="landmark"
                                        variant="outlined"
                                        className="textfields"
                                    />
                                </div>
                                <div className="radiodiv">
                                    <Typography id="type-name">Type</Typography>
                                    <RadioGroup row aria-label="Type" name="position" defaultValue="top">
                                        <FormControlLabel
                                            value="top"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Home"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="start"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Work"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="end"
                                            control={<Radio style={{color: "rgb(160,48,55)"}}/>}
                                            label="Other"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                    <Button id="customerBtn"
                                            style={{backgroundColor: this.state.color}}>
                                        Continue
                                    </Button>
                                </div>
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