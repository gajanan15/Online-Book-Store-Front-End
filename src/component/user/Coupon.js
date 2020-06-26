import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

class Coupon extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="coupon-hero">
                <div>
                    <Card className="coupon-box">
                        <div style={{height:"50%",backgroundColor:"brown"}}>
                            <Typography style={{color:"#fff",fontSize:"20px",marginLeft:"5%",marginTop:"1%"}}>
                                Coupons
                            </Typography>
                        </div>
                    </Card>

                </div>
            </div>
        );
    }
}

export default Coupon;