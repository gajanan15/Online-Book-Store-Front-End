import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import CbHeader from "../utils/CbHeader";
import {AdminService} from "../../service/AdminService";
import "../../css/HomePage.css";
import Pagination from "@material-ui/lab/Pagination";
import CustomSnackBar from "../utils/CustomSnackBar";
import Select from "@material-ui/core/Select";
import CustomCard from "./CustomCard";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CbFooter from "../utils/CbFooter";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            myFlag: true,
            searchText: "none",
            selectBoxValue: "none",
            name:"",
            userData:[],
        }
        this.searchBar = React.createRef();
    }

    getBooks = () => {
        new AdminService().displaybook(this.state.pageNo).then(response => {
            this.setState({
                data: response.data,
                temp: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    getCount = () => {
        new AdminService().getCount().then(response => {
            this.setState({
                dataLength: response.data,
                tempLength: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    getUser = () =>{

        new AdminService().userDetails().then(response=>{
            this.setState({
                name:response.data.fullName,
                userData:response.data
            })
        }).catch((error) =>{
            console.log(error)
        })
    }

    componentDidMount() {
        let user = localStorage.getItem('Authorization')
        this.getBooks();
        this.getCount();
        if(user !== null){
            this.getUser();
        }
        this.searchBar.current.handleSearchbar();
    }

    alerts = (event, value) => {
        if (!this.state.myFlag) {
            this.state.pageNo = value
            this.getBooks()
        } else {
            this.state.pageNo = value
            this.searchAndFilter()
        }
    }


    getSearchText = (text) => {
        if (text.trim().length === 0) {
            this.getBooks()
            this.getCount()
            this.setState({
                searchText: "none"
            })
        } else {
            this.setState({
                searchText: text,
                myFlag: true,
                selectBoxValue:this.state.selectBoxValue="none"? "NEWEST_ARRIVALS":this.state.selectBoxValue
            }, () => this.searchAndFilter())
        }
    }

    searchAndFilter = () => {
        new AdminService().searchAndFilter(this.state.pageNo, this.state.searchText, this.state.selectBoxValue).then(response => {
            this.setState({
                data: response.data.books,
                dataLength: response.data.size
            })
            this.displaySearchBook(response.data.books, "", this.state.searchText, response.data.size)
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
                dataLength: 0,
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
                dataLength: countData
            })
        }
    }

    handleChange = (event) => {
        if (event.target.value === "None") {
            this.setState({
                selectBoxValue: "NEWEST_ARRIVALS",
            }, () => this.searchAndFilter())
        } else {
            this.setState({
                selectBoxValue: event.target.value,
            }, () => this.searchAndFilter())
        }
    }


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        let data = this.state.data;
        return (
            <div>
                <CbHeader userData={this.state.userData} ref={this.searchBar} test={this.getSearchText} name={this.state.name}/>
                <div className="maincarddiv">
                    <Container className="maincontain" id="maincontainer">
                        <div id="filter">
                            <h2>Books <p className="maincontain-p"> ({this.state.dataLength} items)</p></h2>
                            <ThemeProvider theme={theme}>
                                <Select
                                    native
                                    className="select-filter"
                                    variant="outlined"
                                    onChange={this.handleChange}>
                                    <option defaultValue value={"None"}>Sort by</option>
                                    <option value={"LOW_TO_HIGH"}>Price:Low to High</option>
                                    <option value={"HIGH_TO_LOW"}>Price:High to Low</option>
                                    <option value={"NEWEST_ARRIVALS"}> Newest Arrivals</option>
                                </Select>
                            </ThemeProvider>
                        </div>
                        <Grid container spacing={4}>
                            {data.map((book, index) => {
                                return <Grid key={book.id}  item xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard key={book.id} cartReference={this.searchBar} book={book} index={index}/>
                                </Grid>
                            })}
                        </Grid>
                    </Container>
                </div>
                <Grid container className="page">
                    <Pagination showFirstButton showLastButton count={Math.ceil(this.state.dataLength / 8)}
                                onChange={this.alerts}/>
                </Grid>
                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }
                <CbFooter/>
            </div>
        );
    }
}

export default HomePage;