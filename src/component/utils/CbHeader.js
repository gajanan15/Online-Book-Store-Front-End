import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import '../../css/CbHeader.css';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SignUp from "../user/SignUp";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


export class CbHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: [],
            tempData: [],
            searchVisibility: false,
            counter: 0,
            visibilityValueOfLogin: 'hidden',
            visibilityOfDialogBox: false,
            visibilityOfCloseIcon: 'hidden',
            userLoggedIn: false,
            logorsign:"LOGIN/SIGNUP",
            redirect:"user/login"
        }

    }

    handleSearchbar = () => {
        this.setState({
            searchVisibility: true
        })
    }

    getText = (event) => {
        this.props.test(event.target.value)
    }

    handleBadgeCount(value, updateFactor) {
        if (updateFactor === "updateButton")
            this.setState({
                counter: value
            })
        if (updateFactor === "addButton") {
            this.setState({
                counter: this.state.counter + 1
            })
        }
    }

    handleLoginBoxVisibility = (event) => {

        if (`${this.state.visibilityValueOfLogin}` === "hidden") {
            this.setState({visibilityValueOfLogin: "visible"})
            return;
        }
        if (`${this.state.visibilityValueOfLogin}` === "visible") {
            this.setState({visibilityValueOfLogin: "hidden"})
            return;
        }
    }

    handleDialogueBoxVisibility = (user) => {
        if (user === true) {
            window.location.reload(true)
            localStorage.removeItem('Authorization')
        }
        if (user === false) {
            this.setState({
                visibilityOfDialogBox: true,
                visibilityOfCloseIcon: "visible",
                visibilityValueOfLogin: "hidden"
            })
        }
    }

    handleClose = () => {
        this.setState({
            visibilityOfDialogBox: false
        })
    }

    componentDidMount() {
        this.isLoggedIn()
    }

    isLoggedIn = () => {
        let user = localStorage.getItem('Authorization');
        if(user){
            this.setState({
                logorsign: "LOGOUT",
                redirect: "cart",
                userLoggedIn: true
            })}

        if(user == "null" || user == "undefined"){
            this.setState({
                logorsign: "LOGIN/SIGNUP",
                redirect: "login",
                userLoggedIn: false
            })}
    }

    render() {
        return (
            <div className="main">

                <AppBar position="fixed" id="appbar">
                    <Toolbar id="tool">
                        <ImportContactsIcon id="main-logo"/>
                        <Typography id="title" variant="h6" noWrap>
                            <Link to={"/"}>CB's Book Store</Link>
                        </Typography>
                        {this.state.searchVisibility &&
                        <div className="search">
                            <div className="searchIcon">
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search..."
                                className="inputRoot inputInput"
                                inputProps={{'aria-label': 'search'}}
                                onChange={(event) => this.getText(event)}
                            />
                        </div>
                        }

                        <div className="grow"/>
                        {this.state.searchVisibility &&
                        <div className="shoppingIcon">
                            <IconButton aria-label="show 4 new mails" id="shopping-icon" >
                                <Badge className="badge-carticon" badgeContent={this.state.counter} style={{color:"white"}}>
                                    <Link style={{color: 'white'}} to={`/${this.state.redirect}`}><ShoppingCartOutlinedIcon id="cart-icon"/></Link>
                                </Badge>
                            </IconButton>
                        </div>
                        }

                        {this.state.searchVisibility &&
                        <div className={this.state.visibilityValueOfLogin === "visible" ?
                            "loginsignup" : "loginsignup1"}>
                            <PersonOutlineSharpIcon className="userIcon" onClick={this.handleLoginBoxVisibility}/>
                        </div>
                        }
                    </Toolbar>
                </AppBar>
                <Dialog className="maindialoguebox" aria-labelledby="customized-dialog-title"
                        open={this.state.visibilityOfDialogBox} onClose={this.handleClose}>
                    <DialogContent className="dialoguecontent" id="customized-dialog-title">
                        <SignUp/>
                    </DialogContent>
                </Dialog>

                {!this.state.userLoggedIn ?
                    <Card className="loginsignupcard" style={{visibility: this.state.visibilityValueOfLogin}} variant="outlined">
                        <CardContent><Typography id="mainName" style={{fontWeight: "bold"}}>Welcome</Typography>
                            <Typography id="subName" color="textSecondary" gutterBottom>To
                                access the account and manage orders</Typography>
                            <Button className="loginorsignupbutton"
                                    onClick={() => this.handleDialogueBoxVisibility(this.state.userLoggedIn)}>{this.state.logorsign}</Button>
                        </CardContent>
                    </Card>
                    :
                    <Card  className="loginsignupcard1" style={{visibility: this.state.visibilityValueOfLogin}} variant="outlined">
                        <CardContent><Typography id="userName-logincart">Hello, {this.props.name}</Typography>
                            <Typography id="order-title" color="textSecondary" ><CardGiftcardIcon id="order-icon"/>
                                <Link to={"/orders"}>My Orders</Link>
                            </Typography>
                            <Button className="loginorsignupbutton"
                                    onClick={() => this.handleDialogueBoxVisibility(this.state.userLoggedIn)}>{this.state.logorsign}</Button>
                        </CardContent>
                    </Card>
                }

            </div>
        )
    }
}

export default CbHeader
