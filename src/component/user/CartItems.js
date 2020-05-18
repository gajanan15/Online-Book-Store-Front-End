import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {AdminService} from "../../service/AdminService";

class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            changedCount: '',
            disableDecrementButton: false,
            disableIncrementButton: true,
            totalPrice: this.props.books.bookPrice
        }
    }


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
                    < div
                        className="plusminusdiv">
                        < IconButton
                            id="minus"
                            disabled={this.state.disableIncrementButton}
                            onClick={()=>
                                this.onclick('sub', this.props.books.bookID, this.props.books.id, this.props.books.bookPrice)
                            }>
                            <
                                RemoveCircleOutlineIcon
                                style={
                                    this
                                        .state.disableIncrementButton === true ? {color: "#d3d3d3", fontSize: "90%"} : {
                                        fontSize: "90%",
                                        color: "rgb(165,42,42)"
                                    }
                                }
                            />
                            < /IconButton>
                                < input
                                    id="text"
                                    value={this.state.count}> < /input>

                                    < IconButton
                                        className="plus"
                                        disabled={this.state.disableDecrementButton}
                                        onClick={() =>
                                            this.onclick('add', this.props.books.bookID, this.props.books.id, this.props.books.bookPrice)
                                        }>
                                        <AddCircleOutlineIcon style={{fontSize: "90%", color: "rgb(165,42,42)"}}/>
                                    </IconButton>
                                    <button className="remove">Remove
                                    </button>
                    </div>
                </div>
                <br/>
            </div>

    );
    }
    }

    export default CartItems;