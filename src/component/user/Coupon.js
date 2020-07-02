import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import "../../css/Coupon.css"
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

class Coupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibilityOfDialogBox: true,
            checked:{},
            coupon:"",
            discountPrice:"",index:0
        }
    }

    handleChange=()=>{
        this.props.handleTotalPrice(this.state.coupon,"applied",this.props.coupons[this.state.index].discountPrice,this.state.index)
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
                coupon:event.target.value,
                index:index
            })
        }

    };

    componentDidMount() {
        this.setState(previousState => ({
            checked: {
                ...previousState.checked,
                [this.props.index]: !previousState.checked[this.props.index]
            },
        }));
    }

    render() {
        const { checked } = this.state;
        const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
        const disabled = checkedCount == 1;


        return (
            <div className="coupon-hero">
                <div>
                    {this.props.coupons === null ?

                        <Card className="coupon-box3">

                            <div className="coupon-name-div1">
                                <Typography style={{color:"#fff", fontSize:"28px", marginLeft:"5%", marginTop:"2%"}}>
                                    Coupons
                                </Typography>
                            </div>
                            <div className="image-coupon">
                                <img src={require("../../asset/nooffer.png")} alt="Sorry, currently no coupons available"/>
                            </div>
                        </Card>

                        :

                        <Card className={this.props.coupons.length === 1 ? "coupon-box2" : this.props.coupons.length === 2 ? "coupon-box1" :  "coupon-box"}>

                            <div className={this.props.coupons.length === 1 ? "coupon-name-div1" : this.props.coupons.length === 2 ? "coupon-name-div" : "coupon-name-div"} >
                                <Typography style={{color:"#fff", fontSize:"22px", marginLeft:"5%", marginTop:"2%"}} >
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
                                                    <Typography style={{marginLeft:"4%"}}>{coupon.description}</Typography>
                                                </div>

                                            </div>
                                            <Typography style={{marginLeft:"25%"}}><b>Save Rs.{coupon.discountPrice}</b></Typography>
                                            <Typography style={{marginLeft:"25%"}}>Expires on <b>{coupon.expireCouponDate}</b></Typography>
                                            <Divider style={{width:"95%",marginLeft:"2%"}}/>
                                        </div>
                                    )}
                            </div>
                            <Typography style={{marginTop: "5%", marginLeft: "2%"}}>
                                <Button id="coupon-btn" onClick={this.handleChange}>APPLY</Button>
                            </Typography>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}

export default Coupon;
