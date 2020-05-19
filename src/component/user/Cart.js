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
                                style={cartData.length === 0 ? {visibility: "hidden"} : {visibility: this.state.btn1}}
                                id="orderBtn">
                            Continue
                        </Button>
                    </Card>
                    <ExpansionPanel className="customerdetails" variant="outlined">
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="summary">
                            <Typography id="customer-details">Customer Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Container>
                <CbFooter/>
            </div>
        );
    }
}

export default Cart;