import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import '../Css/CbHeader.css';


export class CbHeader extends Component {
    render() {
        return (
            <div className="main">
                <AppBar position="static" style={{backgroundColor:'brown'}}>
                    <Toolbar>
                    <MenuBookIcon  style={{fontSize:'250%'}}/>
                        <Typography className="title" variant="h6" noWrap>
                            CB's Book Store
                        </Typography>
                        <div className="search">
                            <div className="searchIcon">
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search books"
                                className="inputRoot inputInput"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className="grow" />
                        <div className="shoppingIcon">
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <AddShoppingCartIcon style={{ fontSize: '150%', display: 'flex' }} />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CbHeader
