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
import Zoom from "@material-ui/core/Zoom";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    getBooks=()=>{
        new AdminService().displaybook().then(response => {
            this.setState({
                data:response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getBooks();
    }

    render() {
        let data=this.state.data;
        return (
            <div>
                <CbHeader/>
                <div>
                    <Container fixed className="maincontain">
                        <h2>Books <sub style={{fontSize:"18px", color:"#c3c7c3"}}> ({data.length} items)</sub></h2>
                        <Grid container spacing={6}>
                            {data.map((book)=> {
                                return<Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Card className="gridroot">
                                        <Tooltip disableFocusListener disableTouchListener
                                                 title={book.description}
                                                 placement="right-end"
                                                 className="info"
                                                 style={{fontSize:"25px"}}>
                                            <InfoOutlinedIcon/>
                                        </Tooltip>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className="image1"
                                                height="200"
                                                image={require(`../../asset/${book.imageUrl}`)}/>
                                            <div id="stock-label" style={book.quantity===0 ? {visibility:"visible",color:"#FF0000"} : {visibility:"hidden"}}>Out Of Stock</div>
                                        </CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6" component="h2" style={{fontSize:"16px"}}>
                                                    {book.bookName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    by {book.authorName}
                                                </Typography>
                                                <Typography component="h2" style={{marginBottom: "-2%"}}>
                                                    Rs.{book.bookPrice}
                                                </Typography>
                                            </CardContent>
                                        <CardActions>
                                            <Button style={{color:"#fff"}} disabled={book.quantity===0 ? true : false}>
                                                Add To Bag
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            })}
                        </Grid>
                    </Container>
                </div>
            </div>
        );
    }
}

export default HomePage;