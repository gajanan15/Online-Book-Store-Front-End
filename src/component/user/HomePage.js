import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import CbHeader from "../utils/CbHeader";
import {AdminService} from "../../service/AdminService";
import Pagination from "@material-ui/lab/Pagination";
import CustomCard from "./CustomCard";
import "../../css/HomePage.css";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            data: [],
            pageNo: 1,
            dataLength: 0,
            tempLength: 0,
            temp: [],
            snackFlag: false,
            severity: "error",
            snackMessage: "",
            tempTwo: [],
            searchActivated: "",
            myFlag: false,
            searchText: "none",
            selectBoxValue: "NEWEST_ARRIVALS"
        }
    }

    getBooks=()=>{
        new AdminService().displaybook(this.state.pageNo).then(response => {
            console.log(response.data);
            this.setState({
                data:response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }



    getCount=()=>{
        new AdminService().getCount().then(response => {
            this.setState({
                dataLength:response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getBooks();
        this.getCount();
    }

    alerts=(event,value)=>{
        this.setState({
            pageNo:value
        })
        this.getBooks()
    }

    getSearchText = (text) => {
        if (text.trim().length === 0) {
            this.getBooks()
            this.getCount()
        } else {
            this.setState({
                searchText: text,
                myFlag: true
            }, () => this.searchAndFilter())
        }
    }

    searchAndFilter = () => {
        new AdminService().searchAndFilter(this.state.pageNo, this.state.searchText, this.state.selectBoxValue).then(response => {
            this.setState({
                data: response.data.bookDetails,
                dataLength: response.data.size
            })
            this.displaySearchBook(response.data.bookDetails, "", this.state.searchText, response.data.size)
        }).catch((error) => {
            this.displaySearchBook([], "error", "", 0)
        })
    }

    displaySearchBook = (filteredData, errormessage, input, countData) => {
        if (filteredData.length === 0 && errormessage) {
            this.getBooks()
            this.getCount()
        }
        if (filteredData.length === 0 && !errormessage) {
            this.setState({
                data: this.state.tempTwo,
                snackFlag: true,
                snackMessage: `No books available with name ${input}`
            })
            setTimeout(() => {
                this.setState({
                    snackFlag: false
                })
            }, 3000);
        } else {
            this.setState({
                data: filteredData,
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            selectBoxValue: event.target.value,
        }, () => this.searchAndFilter())
    }

    render() {
        let data = this.state.data;
        return (
            <div>
                <CbHeader ref={this.searchBar} test={this.getSearchText}/>
                <div>
                    <Container className="maincontain">
                        <div id="filter">
                            <h2>Books <p className="maincontain-p"> ({this.state.dataLength} items)</p></h2>
                            <Select
                                native
                                id="select-filter"
                                variant="outlined"
                                onChange={this.handleChange}>
                                <option selected value={"None"}>Sort by</option>
                                <option value={"LOW_TO_HIGH"}>LOW_TO_HIGH</option>
                                <option value={"HIGH_TO_LOW"}>HIGH_TO_LOW</option>
                            </Select>
                        </div>
                        <Grid container spacing={6}>
                            {data.map((book, index) => {
                                return <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard book={book} index={index}/>
                                </Grid>
                            })}
                        </Grid>
                    </Container>
                </div>
                <Grid container justify={"center"}>
                    <Pagination showFirstButton showLastButton count={Math.ceil(this.state.dataLength / 8)}
                                onChange={this.alerts}/>
                </Grid>
                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }
            </div>
        );
    }
}

export default HomePage;