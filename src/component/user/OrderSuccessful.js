import React, {Component} from 'react';
import OrderSuccessfully from '../../asset/Order-placed-successfully.png'
import Button from "@material-ui/core/Button";
import '../../css/OrderSuccessful.css'
import data from '../../data/data.json'
import ReactTooltip from "react-tooltip";
import CbHeader from "../utils/CbHeader";
import CbFooter from "../utils/CbFooter";
import SignUp from "./SignUp";

class OrderSuccessful extends Component {

    handleChange = () => {
        this.props.history.push("/")
    }

    render() {
        let user = localStorage.getItem('Authorization');
        if(user == "null" || user == "undefined" || !user){
            return <SignUp/>
        }
        else
        return (
            <div>
                <CbHeader/>
                <div className="mainformorder">
                    <img className={'successfulimage'} src={OrderSuccessfully} alt={"Not found"}/>
                    <div className='messageorder'>
                        <p id="firstLine">Hurray!!!... Your order is confirmed.</p>
                        <p id="secondLine">the order Id is<b> #{this.props.match.params.random}</b> save the order id
                            for <br/>further communication..</p>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <th colSpan="1">Email Us</th>
                            <th colSpan="1">Contact Us</th>
                            <th colSpan="3">Address</th>
                        </tr>

                        {
                            data.map(data => {
                                return <tr>
                                    <td data-tip data-for='email'>{data.EmailUs}
                                        <ReactTooltip id='email' aria-haspopup='true' role='example'>
                                            <p>{data.EmailUs}</p>
                                        </ReactTooltip>
                                    </td>
                                    <td data-tip data-for='mobileNumber'>{data.ContactUs}
                                        <ReactTooltip id='mobileNumber' aria-haspopup='true' role='example'>
                                            <p>{data.ContactUs}</p>
                                        </ReactTooltip>
                                    </td>
                                    <td data-tip data-for='address-tool'> {data.Address}
                                        <ReactTooltip id='address-tool' aria-haspopup='true' role='example'>
                                            <p>{data.Address}</p>
                                        </ReactTooltip>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    <Button
                        onClick={this.handleChange}
                        id="btn">CONTINUE SHOPPING</Button>
                </div>
                <CbFooter/>
            </div>
        );
    }
}

export default OrderSuccessful;