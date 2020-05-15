import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import '../../css/CbHeader.css';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";



export class CbHeader extends Component {

    constructor(props){
        super(props);
        this.state={
            searchText:"",
        }
    }

    getText = (event) => {
        this.setState({
            searchText:event.target.value,
        })
    }

    render() {
        return (
            <div className="main">
                <AppBar position="fixed" id="appbar">
                    <Toolbar id="tool">
                        <MenuBookIcon style={{fontSize:'200%'}}/>
                        <Typography id="title" variant="h6" noWrap>
                            CB's Book Store
                        </Typography>

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
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CbHeader
