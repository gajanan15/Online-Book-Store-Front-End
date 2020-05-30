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
import CardContent from "@material-ui/core/CardContent";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

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

    render() {


        return (
            <div className="main">
                <AppBar position="fixed" id="appbar">
                    <Toolbar id="tool">
                        <ImportContactsIcon id="main-logo"/>
                        <Typography id="title" variant="h6" noWrap>
                            CB's Book Store
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
                            <IconButton aria-label="show 4 new mails">
                                <Badge className="badge-carticon" badgeContent={this.state.counter}>
                                    <Link style={{color: 'white'}} to={"/cart"}>
                                        <ShoppingCartOutlinedIcon id="cart-icon"/>
                                    </Link>
                                </Badge>
                            </IconButton>
                        </div>
                        }
                        <PersonOutlineSharpIcon className="userIcon"/>
                    </Toolbar>
                </AppBar>

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
