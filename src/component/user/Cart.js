import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextFields from "../utils/CustomTextFields";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import '../../css/Cart.css'
import {withRouter} from 'react-router';
import CbHeader from "../utils/CbHeader";
import Card from "@material-ui/core/Card";
import {AdminService} from "../../service/AdminService";
import CartItems from "./CartItems";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import CbFooter from "../utils/CbFooter";
import SignUp from "./SignUp";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Coupon from "./Coupon";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customerPanel: false,
            btn1: "visible",
            btn2: "visible",
            a: "hidden",
            summaryPanel: false,
            text: false,
            random: 0,
            count: 1,
            enableBtn: true,
            customerName: "", mobileNo: "", pincode: "", locality: "", address: "", city: "", landmark: "", email: "",
            name: " ", contact: " ", pinCode: " ", locaLity: " ", addRess: " ", ciTy: " ", landMark: " ", Email: " ",
            nameError: "", numberError: "", pincodeError: "", localityError: "", addressError: "", cityError: "",
            landmarkError: "", emailError: "", err: "",
            checkoutData: [],
            changedCount: '',
            btnDisable: true,
            color: "grey",
            totalPrice: "",
            disableFlag: false,
            userData: [], customerData: "",
            addressType: "",
            orderID: '', visibilityOfDialogBox: false,
            discountTotal: "", discountCoupon: 0, coupons: [], couponStatus: "", couponPrice: 0, coupon: "", index: 0
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

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.buttonVisibility()
    }

    handleCustomer = () => {
        this.setState({
            customerPanel: true,
            btn1: "hidden",
            disableFlag: true
        })
        this.state.disableFlag = true
        this.setTotalValue()
        this.discountCoupon()
    }

    getMyOrder = () => {
        new AdminService().placedOrder(this.state.totalPrice, this.state.couponPrice).then(response => {
            this.setState({
                orderID: response.data.data
            }, () => this.props.history.push(`/orders/successful/${this.state.orderID}`))
        }).catch((error) => {
            console.log(error)
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
        this.setTotalValue()
        this.buttonVisibility()
    }

    getDetails = () => {
        const data = {
            pincode: this.state.pincode,
            locality: this.state.locality,
            address: this.state.address,
            city: this.state.city,
            landmark: this.state.landmark,
            addressType: this.state.addressType,
        }

        new AdminService().getDetails(data).then(response => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }


    handleCheckOut = () => {

        this.getMyOrder()
        this.getDetails()
        this.addCoupon()
    }

    handleFocus = () => {
        this.setState({
            text: false,
            btn2: true,
            a: "hidden"
        })
    }

    getUser = () => {
        new AdminService().userDetails().then(response => {
            this.setState({
                userData: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.handleCart()
        this.getUser()
        this.buttonVisibility()
    }

    handleCart = () => {
        new AdminService().myCart().then(response => {
            this.setState({
                checkoutData: response.data.data,
            })
        }).catch((error) => {
            this.setState({
                checkoutData: []
            })
        })
    }

    setTotalValue = () => {
        let newVar = this.state.checkoutData.map((books, index) => {
            return (books.bookDetails.bookPrice * books.quantity)
        });
        this.state.totalPrice = newVar.reduce((a, b) => a + b)
        this.setState({
            discountCoupon: this.state.totalPrice
        })
    }

    formCheck() {
        return this.state.pincode.trim().length > 0 && this.state.locality.trim().length > 0 &&
            this.state.address.trim().length > 0 && this.state.city.trim().length > 0;
    }

    errorCheck() {
        return this.state.pinCode.trim().length === 0 && this.state.locaLity.trim().length === 0 &&
            this.state.addRess.trim().length === 0 && this.state.ciTy.trim().length === 0;
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

    getCoupon = () => {
        this.setState({
            visibilityOfDialogBox: true
        })
    }

    handleClose = () => {
        this.setState({
            visibilityOfDialogBox: false
        })
    }

    handleTotalPrice = (data, status, price, index) => {
        this.setState({
            visibilityOfDialogBox: false,
            coupon: data,
            couponStatus: status,
            couponPrice: price,
            discountCoupon: (this.state.totalPrice - price) < 0 ? 0 : this.state.totalPrice - price,
            index: index
        })
    }

    discountCoupon = () => {
        new AdminService().getCoupon(this.state.totalPrice).then(response => {
            this.setState({
                coupons: response.data.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    addCoupon = () => {
        new AdminService().addDiscountPrice(this.state.coupon, this.state.totalPrice).then(response => {
            this.setState({
                discountCoupon: response.data.data
            })
        }).catch((error) => {
            console.log(error)
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
        let cartData = this.state.checkoutData

        let user = localStorage.getItem('Authorization');
        if (!user) {
            return <SignUp/>
        } else
            return (
                <div>
                    <CbHeader/>
                    <ul className="breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li>My Cart</li>
                    </ul>

                    <Container id="cartcontainer" maxWidth="md">
                        <Card className={cartData.length === 1 ? "bookdiv1" : "bookdiv"} variant="outlined">
                            <h4>My Cart ({cartData.length})</h4>
                            <div className={cartData.length <= 2 ? "no-scroll" : "scrollbar"}>
                                {
                                    cartData.length > 0 ? cartData.map((books, index) => {
                                        return <CartItems flag={this.state.disableFlag}
                                                          handleSummary={this.setTotalValue}
                                                          key={books.id} price={books.totalPrice}
                                                          cartData={cartData} handleCart={this.handleCart}
                                                          cartID={books.id}
                                                          quantity={books.quantity}
                                                          books={books.bookDetails} index={index}/>
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
                        <ExpansionPanel className="customerdetails" variant="outlined"
                                        expanded={this.state.customerPanel}>
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
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.fullName}
                                                required={true}
                                                label="Name"
                                                id="name"
                                                name="customerName"
                                                variant="outlined"
                                                className="textfields" disabled
                                            />
                                            <TextFields
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.mobileNumber}
                                                required={true}
                                                label="Phone Number"
                                                id="contact"
                                                name="mobileNo"
                                                Text={this.state.contact}
                                                variant="outlined"
                                                className="textfields" disabled
                                            />
                                        </ThemeProvider>
                                    </div>

                                    <div className="textbox secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.pincode}
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
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.locality}
                                            required={true}
                                            label="Locality"
                                            id="locaLity"
                                            className="locality-text"
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
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.address}
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
                                    <div className="secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.city}
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
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.landmark}
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
                                        <RadioGroup onChange={this.changeState} row aria-label="Type"
                                                    name="addressType">
                                            <FormControlLabel
                                                value="HOME"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Home"
                                                id="type-label"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="WORK"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Work"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="OTHER"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Other"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                        </RadioGroup>
                                    </div>

                                    <Button onClick={this.handleSummary} id="customerBtn"
                                            disabled={this.state.btnDisable}
                                            style={{backgroundColor: this.state.color, visibility: this.state.btn2}}>
                                        Continue
                                    </Button>

                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel className="oredresummary" variant="outlined" expanded={this.state.summaryPanel}>
                            <ExpansionPanelSummary aria-controls="panel1a-content" id="details">
                                <Typography id="customer-details">Order Summary</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <div className="detailsblock">
                                    <div
                                        className={cartData.length === 1 ? "details-block" : cartData.length === 2 ? "no-scroll" : "scrollbar"}>
                                        {
                                            cartData.map((books, index) =>
                                                <div key={index}>
                                                    <div className="details-content">
                                                        <div>
                                                            <img src={books.bookDetails.imageUrl} alt={"Not found"}
                                                                 className="img"/>
                                                        </div>
                                                        <div className="oredr-summary-books-div">
                                                            <Typography id="summary-bookname"
                                                                        component="h2">{books.bookDetails.bookName}</Typography>
                                                            <Typography variant="body2" color="textSecondary"
                                                                        id="summary-authorname">{books.bookDetails.authorName}</Typography>
                                                            <Typography component="h2"
                                                                        id="summary-cost">Rs. {books.totalPrice}</Typography>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <Divider/><br/>
                                                </div>
                                            )}

                                    </div>


                                    <div className="coupon-div">
                                        <b>Coupons</b>
                                        <div className="coupon-div1">
                                            <LocalOfferOutlinedIcon id="offer-icon"/>
                                            {this.state.couponStatus === "applied" ?
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">1 Coupon Applied</p>
                                                    <Button id="coupon-apply-btn" onClick={this.getCoupon}>Edit</Button>
                                                </div>
                                                :
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">Apply Coupons</p>
                                                    <Button id="coupon-apply-btn"
                                                            onClick={this.getCoupon}>Apply</Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div>
                                        <p><b>Price details</b></p>
                                        <div className="price-sub-div">
                                            <p> Sub Total Price: </p>
                                            <p className="sub-price">Rs. {this.state.totalPrice}</p>
                                        </div>
                                        <div className="price-sub-div">
                                            <p> Discount Price: </p>
                                            <p className="discount-price">Rs. {this.state.couponPrice}</p>
                                        </div>
                                        <hr className="horizontal-line"/>
                                        <div className="price-main-div">
                                            <b>Total price: </b>
                                            <b className="total-price">Rs.{this.state.discountCoupon}</b>
                                        </div>

                                    </div>

                                    <Button onClick={this.handleCheckOut} id="summryBtn">
                                        Place Order
                                    </Button>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Container>
                    <Dialog className="coupon-dialog-box" aria-labelledby="customized-dialog-title"
                            open={this.state.visibilityOfDialogBox} onClose={this.handleClose}>
                        <DialogContent id="dialoguecontent" id="customized-dialog-title">
                            <Coupon coupons={this.state.coupons} totalPrice={this.state.totalPrice}
                                    handleTotalPrice={this.handleTotalPrice} index={this.state.index} />
                        </DialogContent>
                    </Dialog>
                    <CbFooter/>
                </div>
            );
    }
}

export default withRouter(Cart);
