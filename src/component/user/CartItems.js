import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CbFooter from "../utils/CbFooter";
import CbHeader from "../utils/CbHeader";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {AdminService} from "../../service/AdminService";
import Divider from "@material-ui/core/Divider";

class CartItems extends Component {
    render() {
        return (
            <div className="mycart">
                <div>
                    <img src={this.props.books.bookImg} style={{height: "16vh"}}/>
                </div>
                <div className="booksContainer" style={{marginLeft: "-1%", marginBottom: "-1.5%"}}>
                    <Typography component="h2" id="bookname1">{this.props.books.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary"
                                id="authorName">{this.props.books.authorName}</Typography>
                    <Typography component="h2" id="cost">Rs.
                        {this.props.books.bookPrice * this.props.books.quantity}</Typography>
                    <div className="plusminusdiv">
                        <IconButton id="minus">
                            <RemoveCircleOutlineIcon style={{fontSize: "90%", color: "rgb(165,42,42)"}}/>
                        </IconButton>

                        <input id="text" value={this.state.count}></input>

                        <IconButton className="plus"
                        >
                            <AddCircleOutlineIcon style={{fontSize: "90%", color: "rgb(165,42,42)"}}/>
                        </IconButton>

                        <button className="remove">Remove
                        </button>
                    </div>
                </div>
                <br/>
                {this.props.index !== this.props.cartData.length - 1 ?
                    <Divider/> : console.log()
                }
            </div>

        );
    }
}

export default CartItems;