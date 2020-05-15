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
            data:[],
            pageNo:1,
            dataLength:0,
            searchText:""
        }
    }

    getBooks=()=>{
        console.log("response.data");
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

    getSearchText=(text)=>{
        if (text.trim().length === 0) {
            this.getBooks()
            this.getCount()
        }else {
            this.setState({
                searchText:text
            })
        }
    }

    render() {
        let data=this.state.data;
        return (
            <div>
                <CbHeader getSearchText={this.getSearchText}/>
                <div>
                    <Container fixed className="maincontain">
                        <h2>Books <p className="maincontain-p"> ({this.state.dataLength} items)</p></h2>
                        <Grid container spacing={5}>
                            {data.map((book,index)=> {
                                return<Grid item xs={12} sm={6} md={4} lg={3}>
                                <CustomCard book={book} index={index}/>
                                </Grid>
                            })}
                        </Grid>
                    </Container>
                    <Grid justify="center">
                        <div className="page">
                            <Pagination showFirstButton showLastButton count={Math.ceil(this.state.dataLength/8)} onChange={this.alerts}/>
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default HomePage;