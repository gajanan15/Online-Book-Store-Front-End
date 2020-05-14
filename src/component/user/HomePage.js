import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import CbHeader from "../utils/CbHeader";
import {AdminService} from "../../service/AdminService";
import "../../css/HomePage.css";
import Pagination from "@material-ui/lab/Pagination";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            data:[],
            pageNo:1,
            dataLength:0
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getBooks();
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

    render() {
        let data=this.state.data;
        return (
            <div>
                <CbHeader/>
                <div>
                    <Container fixed className="maincontain">
                        <h2>Books <p className="maincontain-p"> ({this.state.dataLength} items)</p></h2>
                        <Grid container spacing={6}>
                            {data.map((book,index)=> {
                                return<Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Card className="gridroot">
                                        <span className="tooltiptext" style={(index+1)%4===0 ? {marginLeft: "-315px"} : {marginLeft:"106px"}}>
                                            <b>Book Description:</b><p className="tooltip-p">{book.description}</p></span>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className="image1"
                                                height="200"
                                                image={require(`../../asset/${book.imageUrl}`)}/>
                                            <div id="stock-label" style={book.quantity===0 ? {visibility:"visible",color:"#FF0000"} : {visibility:"hidden"}}>Out Of Stock</div>
                                        </CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6" component="h2" id="bookname">
                                                    <b> {book.bookName}</b>
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p" id="authorname">
                                                    by {book.authorName}
                                                </Typography>
                                                <Typography component="h2" id="bookprice">
                                                    <b> Rs.{book.bookPrice}</b>
                                                </Typography>
                                            </CardContent>
                                        <CardActions>
                                            <Button style={book.quantity=== 0 ? {backgroundColor:"#d3d3d3",pointerEvents:"none",marginBottom: "2%",width:"60%"}
                                                : {backgroundColor: "rgb(165,42,42)", width: "60%", marginBottom: "2%",color:"#fff"}}>
                                                Add To Bag
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            })}
                        </Grid>
                        <div className="page">
                            <Pagination showFirstButton showLastButton count={this.state.dataLength/3} onChange={this.alerts}/>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default HomePage;