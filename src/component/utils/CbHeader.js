import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import '../../css/CbHeader.css';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';

export class CbHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: [],
            tempData: [],
            searchVisibility: false
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

    render() {
        return (
            <div className="main">
                <AppBar position="fixed" id="appbar">
                    <Toolbar id="tool">
                        <ImportContactsIcon style={{fontSize: '200%'}}/>
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
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default CbHeader
