import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import "../../css/coupon.css"
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
class Coupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalDiscountPrice: "",
            discountCoupon: 100,
            visibilityOfDialogBox: true,
            checked:{},
            coupon:""
        }
    }

    onSelectedChange = (event,index) => {
        this.setState(previousState => ({
            checked: {
                ...previousState.checked,
                [index]: !previousState.checked[index]
            },
        }));

        if(event.target.checked===true){
            this.setState({
                coupon:event.target.value
            })
        }

    };

    render() {

        const { checked } = this.state;
        const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
        const disabled = checkedCount === 1;

        return (
            <div className="coupon-hero">
                <div>
                    <Card className="coupon-box">

                        <div style={{height:"50%",backgroundColor:"brown"}}>
                            <Typography style={{color:"#fff",fontSize:"20px",marginLeft:"5%",marginTop:"1%"}}>
                                Coupons
                            </Typography>
                        </div>
                        <div className="coupon-noscroll">
                            {
                                this.props.coupons.map((coupon,index) =>
                                    <div>
                                        <div style={{display:"flex",marginTop:"2%"}}>
                                            <FormControlLabel
                                                value={coupon.couponsType}
                                                name={coupon.couponsType}
                                                control={<Checkbox style={!checked[index] && disabled ? {marginLeft:"21%",color: "grey"} : {marginLeft:"21%",color: "#a52a2a"}}/>}
                                                onChange={(event) => this.onSelectedChange(event,index)}
                                                checked={checked[index] || false}
                                                disabled={!checked[index] && disabled}
                                            />

                                            <div style={{display:"flex",marginTop:"1%",width:"92%"}}>
                                                <Typography><span  className="coupon-text">{coupon.couponsType}</span></Typography>
                                                <Typography style={{marginLeft:"4%"}}>10% off upto Rs.100 on minimum purchase of Rs.699.0</Typography>
                                            </div>

                                        </div>
                                        <Typography style={{marginLeft:"25%"}}><b>Save Rs.100</b></Typography>
                                        <Typography style={{marginLeft:"25%"}}>Expires on <b>30 June 2020</b></Typography>
                                        <Divider/>
                                    </div>
                                )}
                        </div>
                        <Typography style={{marginTop: "2%", marginLeft: "2%"}}>
                            Maximum saving<br/> <b>Rs.100</b>
                            <Button id="coupon-btn" onClick={this.discountCoupon}>APPLY</Button>
                        </Typography>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Coupon;