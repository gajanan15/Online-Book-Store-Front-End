import React, {Component} from 'react';
import CbHeader from "../utils/CbHeader";
import CbFooter from "../utils/CbFooter";
import '../../css/MyOrders.css'
import Grid from "@material-ui/core/Grid";
import MyOrder from "./MyOrder";
import {AdminService} from "../../service/AdminService";
import Typography from "@material-ui/core/Typography";

class MyOrdersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }
    }

    getPlacedOrder = () => {
        new AdminService().myOrder().then(response => {
            this.setState({
                orderList: response.data.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getPlacedOrder();
    }


    render() {
        let order = this.state.orderList
        return (
            <div>
                <div className="main-order">
                    <Grid container className="ordercontainer">
                        <CbHeader/>
                        <ul className="myorderbreadcrumb">
                            <li><a href="/">Home</a></li>
                            <li>My Orders</li>
                        </ul>

                        <div>
                            {order.reverse().map((book, index) => {
                                return (
                                    <div>
                                        {book.slice(0, 1).map((books, ind) => {
                                            return (<div className="myorderdiv">
                                                <Typography component="h2" id="orderdate">Ordered
                                                    Date: {books.orderDetails.orderPlacedDate}</Typography>
                                                <Typography id="orderid">Order
                                                    ID: {books.orderDetails.orderId}</Typography>
                                            </div>)
                                        })}

                                        <div
                                            className={book.length === 1 ? "order-block" : book.length === 2 ? "orderblock" : "orderblock1"}>
                                            {book.map((abc, ind) => {
                                                return (
                                                    <div className="order-list">
                                                        <MyOrder data={abc}/>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>)
                            })}
                        </div>
                    </Grid>
                </div>
                <CbFooter/>
            </div>
        );
    }
}

export default MyOrdersList;