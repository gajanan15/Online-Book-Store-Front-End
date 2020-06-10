import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

class MyOrder extends Component {

    render() {
        return (
            <div>
                <Grid className="order-grid" item xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
                    <div id="orderimg">
                        <img src={this.props.data.bookDetails.imageUrl} alt={"Not found"} className="order-img"/>
                    </div>
                    <div className="order-div">
                        <Typography id="order-bookname"
                                    component="h2">{this.props.data.bookDetails.bookName}</Typography>
                        <Typography variant="body2" color="textSecondary"
                                    id="order-authorname">{this.props.data.bookDetails.authorName}</Typography>
                        <Typography component="h2"
                                    id="order-cost">Qty. {this.props.data.quantity}</Typography>
                        <Typography component="h2"
                                    id="order-cost">RS. {this.props.data.totalPrice}</Typography>
                    </div>
                </Grid>
                <Divider style={{marginLeft: "1%", marginRight: "1%"}}/>
            </div>
        );
    }
}

export default MyOrder;