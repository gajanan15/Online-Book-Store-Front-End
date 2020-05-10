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


class HomePage extends Component {
    render() {
        return (
            <div>
                <CbHeader/>
                <div >
                    <Container maxWidth="md" className="maincontain">
                        <h2>Books</h2>
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Card className="gridroot">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className="image1"
                                        alt="Contemplative Reptile"
                                        height="200"
                                        image={require("../../asset/images.png")}
                                        title="Marley & Me" />
                                    <CardContent>
                                        <Typography variant="h6" component="h2">
                                            Calling Out For You
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            by Karin Fossum
                                        </Typography>
                                        <Typography component="h2" style={{marginBottom:"-2%"}}>
                                            Rs.325
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button  style={{backgroundColor:"rgb(165,42,42)",color:"#fff",padding:"6px",fontSize:"12px"}}>
                                        Add To Bag
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Card className="gridroot">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className="image1"
                                        alt="Contemplative Reptile"
                                        height="200"
                                        image={require("../../asset/images.png")}
                                        title="Marley & Me" />

                                    <CardContent>
                                        <Typography variant="h6" component="h2">
                                            Calling Out For You
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            by Karin Fossum
                                        </Typography>
                                        <Typography component="h2" style={{marginBottom:"-2%"}}>
                                            Rs.325
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button  style={{backgroundColor:"rgb(165,42,42)",color:"#fff",padding:"6px",fontSize:"12px"}}>
                                        Add To Bag
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Card className="gridroot">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            className="image1"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image={require("../../asset/images.png")}
                                            title="Marley & Me" />

                                        <CardContent>
                                            <Typography variant="h6" component="h2">
                                                Calling Out For You
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                by Karin Fossum
                                            </Typography>
                                            <Typography component="h2" style={{marginBottom:"-2%"}}>
                                                Rs.325
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button  style={{backgroundColor:"rgb(165,42,42)",color:"#fff",padding:"6px",fontSize:"12px"}}>
                                            Add To Bag
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Card className="gridroot">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            className="image1"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image={require("../../asset/images.png")}
                                            title="Marley & Me" />

                                        <CardContent>
                                            <Typography variant="h6" component="h2">
                                                Calling Out For You
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                by Karin Fossum
                                            </Typography>
                                            <Typography component="h2" style={{marginBottom:"-2%"}}>
                                                Rs.325
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button  style={{backgroundColor:"rgb(165,42,42)",color:"#fff",padding:"6px",fontSize:"12px"}}>
                                            Add To Bag
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                </Container>
                </div>

            </div>
        );
    }
}

export default HomePage;