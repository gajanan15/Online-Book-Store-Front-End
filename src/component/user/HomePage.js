import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import CbHeader from "../utils/CbHeader";
import "../../css/HomePage.css";

class HomePage extends Component {
    render() {
        return (
            <div>
                <CbHeader/>
                <div >
                    <Container maxWidth="md" className="maincontain">

                    </Container>
                </div>

            </div>
        );
    }
}

export default HomePage;