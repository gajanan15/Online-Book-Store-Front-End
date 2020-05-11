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
import CbHeader from "../utils/CbHeader";
import "../../css/HomePage.css";
import {AdminService} from "../../service/AdminService";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    getBooks=()=>{
        new AdminService().displaybook().then(response => {
            console.log(response.data);
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
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className="image1"
                                                alt="Contemplative Reptile"
                                                height="200"
                                                image={require(`../../asset/${book.imageUrl}`)}
                                                title=""/>
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
                                            <Button style={{
                                                backgroundColor: "rgb(165,42,42)",
                                                color: "#fff",
                                                padding: "6px",
                                                fontSize: "14px",
                                                width:"100%"
                                            }}>
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