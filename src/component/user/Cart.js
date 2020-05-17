import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CbFooter from "../utils/CbFooter";
import CbHeader from "../utils/CbHeader";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class Cart extends Component {
    render() {
        return (
            <div>
                <CbHeader/>
                <Container id="cartcontainer" maxWidth="md">
                    <Card className={"bookdiv"} variant="outlined">
                        <h4>My Cart (0)</h4>
                        <div>
                            <img src={require("../../asset/Bleeds.jpg")} style={{height: "16vh"}}/>
                        </div>
                        <div className="booksContainer" style={{marginLeft: "-1%", marginBottom: "-1.5%"}}>
                            <Typography component="h2" id="bookname1">Bleeds</Typography>
                            <Typography variant="body2" color="textSecondary" id="authorName">CJ Miller</Typography>
                            <Typography component="h2" id="cost">Rs.50</Typography>
                        </div>
                        <div className="plusminusdiv">
                            <IconButton id="minus">
                                <RemoveCircleOutlineIcon style={{fontSize: "90%", color: "rgb(165,42,42)"}}/>
                            </IconButton>
                            <input id="text" value="1"></input>
                            <IconButton className="plus">
                                <AddCircleOutlineIcon style={{fontSize: "90%", color: "rgb(165,42,42)"}}/>
                            </IconButton>
                        </div>
                        <Button id="orderBtn">
                            Continue
                        </Button>

                    </Card>
                </Container>
                <CbFooter/>
            </div>
        );
    }
}

export default Cart;