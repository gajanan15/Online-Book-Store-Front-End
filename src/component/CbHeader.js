import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import '../css/CbHeader.css';

export class CbHeader extends Component {
    render() {
        return (
            <div className="main">
                <AppBar position="static" style={{backgroundColor:'brown'}}>
                    <Toolbar>
                    <MenuBookIcon  style={{fontSize:'200%'}}/>
                        <Typography className="title" variant="h6" noWrap>
                            CB's Book Store
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CbHeader
