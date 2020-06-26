import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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
                            <div className="coupon-noscroll">
                                        <div>
                                            <div style={{display:"flex",marginTop:"2%"}}>
                                                <FormControlLabel
                                                    value="Coupon"
                                                    name="coupon"
                                                    control={<Checkbox style={{marginLeft:"21%",color: "#a52a2a"}}/>}
                                                    checked={true}
                                                />

                                                <div style={{display:"flex",marginTop:"1%",width:"92%"}}>
                                                    <Typography><span  className="coupon-text">Coupon1</span></Typography>
                                                    <Typography style={{marginLeft:"4%"}}>10% off upto Rs.100 on minimum purchase of Rs.699.0</Typography>
                                                </div>

                                            </div>
                                            <Typography style={{marginLeft:"25%"}}><b>Save Rs.100</b></Typography>
                                            <Typography style={{marginLeft:"25%"}}>Expires on <b>30 June 2020</b></Typography>
                                            <Divider/>
                                        </div>
                            </div>
                            <Typography style={{marginTop: "2%", marginLeft: "2%"}}>
                                Maximum saving<br/> <b>Rs.100</b>
                                <Button id="coupon-btn">APPLY</Button>
                            </Typography>
                        </div>
                    </Card>

                </div>
            </div>
        );
    }
}

export default Coupon;