import React, {Component} from 'react';
import CbHeader from "../utils/CbHeader";
import CbFooter from "../utils/CbFooter";
import '../../css/MyOrders.css'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

class MyOrdersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
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
                            <div>
                                <div className="myorderdiv">
                                    <Typography component="h2" id="orderdate">Ordered Date: 4 jun 2020</Typography>
                                    <Typography id="orderid">Order ID: #558866</Typography>
                                </div>

                                <div className="orderblock">
                                    <Grid className="order-grid" item xs={12} sm={12} md={12} lg={12} xl={12}
                                          spacing={2}>
                                        <div style={{display:"flex"}}>
                                        <div id="orderimg">
                                            <img src={require("../../asset/Bleeds.jpg")} alt={"Not found"}
                                                 className="order-img"/>
                                        </div>
                                        <div style={{marginLeft: "1%", marginTop: "1.5%", width: "60%"}}>
                                            <Typography id="order-bookname"
                                                        component="h2">Bleeds</Typography>
                                            <Typography variant="body2" color="textSecondary"
                                                        id="order-authorname">Jon</Typography>
                                            <Typography component="h2"
                                                        id="order-cost">Qty. 2</Typography>
                                            <Typography component="h2"
                                                        id="order-cost">RS. 600</Typography>
                                        </div>
                                        </div>
                                        <div style={{display:"flex"}}>
                                        <div id="orderimg">
                                            <img src={require("../../asset/Bleeds.jpg")} alt={"Not found"}
                                                 className="order-img"/>
                                        </div>
                                        <div style={{marginLeft: "1%", marginTop: "1.5%", width: "80%"}}>
                                            <Typography id="order-bookname"
                                                        component="h2">The One and Only Bob</Typography>
                                            <Typography variant="body2" color="textSecondary"
                                                        id="order-authorname">Jon</Typography>
                                            <Typography component="h2"
                                                        id="order-cost">Qty. 2</Typography>
                                            <Typography component="h2"
                                                        id="order-cost">RS. 600</Typography>
                                        </div>
                                </div>
                                    </Grid>
                                    <Divider style={{marginLeft: "1%", marginRight: "1%"}}/>
                                </div>

                            </div>
                        </div>
                    </Grid>
                </div>
                <CbFooter/>
            </div>
        );
    }
}

export default MyOrdersList;