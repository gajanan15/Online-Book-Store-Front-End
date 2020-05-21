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
import {Link} from 'react-router-dom'

export class CbHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: [],
            tempData: [],
            searchVisibility: false,
            counter: 0
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
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CbHeader
