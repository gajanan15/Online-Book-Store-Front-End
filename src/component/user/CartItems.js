import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {AdminService} from "../../service/AdminService";
import '../../css/Cart.css';
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Divider from "@material-ui/core/Divider";

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

    checkAndRemove = (count, id, type) => {
        if (count === 0) {
            this.remove(id)
        }
        this.disableDecrementButton(type)
        this.disableIncrementButton(type)
    }

    remove = (id) => {
        new AdminService().remove(id).then(response => {
            this.props.handleCart()
        }).catch((error) => {
            console.log(error)
        })
    }

    onclick(type, id, bookid) {
        if (this.state.count >= 0) {
            this.setState({
                count: type == 'add' ? this.state.count + 1 : this.state.count - 1,
                changedCount: id
            }, () => this.checkAndRemove(this.state.count, bookid, type));
        }
        type === 'add' ? this.updateCount(id, this.state.count + 1) : this.updateCount(id, this.state.count - 1)

    }

    updateCount = (id, count) => {
        const cartDTO = {
            "authorName": this.props.books.authorName,
            "bookID": id,
            "bookName": this.props.books.bookName,
            "bookPrice": this.props.books.bookPrice,
            "quantity": count
        }
        new AdminService().updateCart(cartDTO).then(response => {
            this.props.handleCart()
        }).catch((error) => {
            console.log(error)
        })
    }

    disableDecrementButton = (type) => {
        if (type == 'sub' && this.state.disableDecrementButton) {
            this.setState({
                disableDecrementButton: false
            })
        }
        if (this.state.count === 5 || this.props.flag) {
            this.setState({
                disableDecrementButton: true
            })
        }
    }

    disableIncrementButton = (type) => {
        if ((type == 'add' && this.state.disableIncrementButton) || this.props.flag) {
            this.setState({
                disableIncrementButton: true
            })
        }
        if (this.state.count > 1) {
            this.setState({
                disableIncrementButton: false
            })
        }

        if (this.state.count === 1 || this.props.flag) {
            this.setState({
                disableIncrementButton: true
            })
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.disableDecrementButton()
        this.disableIncrementButton()
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
                    <div className="plusminusdiv">
                        <IconButton id="minus" disabled={this.state.disableIncrementButton}
                                    onClick={() => this.onclick('sub', this.props.books.bookID, this.props.books.id, this.props.books.bookPrice)}>
                            <RemoveCircleOutlineIcon style={this.state.disableIncrementButton === true ? {
                                color: "#d3d3d3",
                                fontSize: "90%"
                            } : {fontSize: "90%", color: "rgb(165,42,42)"}}/>
                        </IconButton>

                        <input id="text" value={this.state.count}></input>

                        <IconButton className="plus" disabled={this.state.disableDecrementButton}
                                    onClick={() => this.onclick('add', this.props.books.bookID, this.props.books.id, this.props.books.bookPrice)}>
                            <AddCircleOutlineIcon style={this.state.disableDecrementButton === true ? {
                                color: "#d3d3d3",
                                fontSize: "90%"
                            } : {fontSize: "90%", color: "rgb(165,42,42)"}}/>
                        </IconButton>

                        <button className="remove" disabled={this.props.flag}
                                onClick={() => this.remove(this.props.books.id)}>Remove
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