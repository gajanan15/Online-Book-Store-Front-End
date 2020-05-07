import React from 'react';
import TextFields from './CustomTextFields'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {AdminService} from '../service/AdminService'
import RefreshIcon from '@material-ui/icons/Refresh';
import '../css/AddBookForm.css'
import CbHeader from "./CbHeader";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CustomSnackBar from "./CustomSnackBar";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BookName: "", authorName: "", description: "", isbn: "",
            quantity: "", bookPrice: "", publishingYear: "", imageUrl: "",
            book: " ", author: " ", Isbn: " ", descriptionOne: " ",
            year: " ", quantity1: " ", price: " ", err: "", abc: "", flag: false,
            snackFlag: false, snackMessage: "", bookError: "", authorError:"", isbnError:"",descriptionError:"",
            quantityError:"",priceError:"",yearError:"",severity:"success"
        };
    }

    handleReset = (e) => {
        this.refs.form.reset();
    }

    myData = () => {
        const DTOdata = {
            bookName: this.state.BookName,
            authorName: this.state.authorName,
            bookPrice: this.state.bookPrice,
            isbn: this.state.isbn,
            quantity: this.state.quantity,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            publishingYear: this.state.publishingYear
        }
        return DTOdata
    }

    handleSave(e) {
        if (this.state.err === false) {
            new AdminService().addbook(this.myData()).then(response => {
                this.setState({
                    snackMessage: response.data.message,
                    snackFlag: true,
                    severity:response.data.message==="Book Added Successfully"? "success":"error"
                })
            })
        } else {
            this.setState({
                flag: true,
                err: true
            })
        }
    }

    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    isDisabled = (event, pattern, error) => {
        if (!event.target.value.match(pattern)) {
            this.setState({
                [event.target.id]: `Invalid ${event.target.name}`,
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    render() {
        return (
            <div>
                <CbHeader/>
                <div className="mainform">
                    <h1>Book Details </h1>
                    <Card className="maincard" variant="outlined" style={{border: "1px solid black", boxShadow: "5px 5px 10px #888888"}}>
                        <CardContent>
                            <form className="root" ref="form" onSubmit={(e) => this.handleSave(e)}
                            >
                                <div className="formContent">
                                    <div className="firsttextbox">
                                        <TextFields
                                            required={true}
                                            error={this.state.bookError}
                                            name="BookName" label="Book Name" onChange={this.changeValue} id="book"
                                            variant="outlined"
                                            className="textfield"
                                            onBlur={e => this.isDisabled(e, "[a-zA-Z]+", "bookError")}
                                            helperText={this.state.book}
                                        />
                                        <TextFields
                                            required={true}
                                            error={this.state.authorError}
                                            label="Author Name" onChange={this.changeValue} name="authorName"
                                            id="author"
                                            helperText={this.state.author}
                                            variant="outlined" className="textfield"
                                            onBlur={e => this.isDisabled(e, "^[A-Za-z]+[ ]*[A-Za-z]*$","authorError")}
                                        />
                                    </div>
                                    <div className="text">
                                        <TextFields
                                            required={true}
                                            label="ISBN" name="isbn" id="Isbn" onChange={this.changeValue}
                                            variant="outlined" className="textfield"
                                            error={this.state.isbnError}
                                            onBlur={e => this.isDisabled(e, "^\\w{10,13}$","isbnError")} helperText={this.state.Isbn}
                                        />
                                        <TextFields label="Quantity" onChange={this.changeValue} id="quantity1"
                                                    variant="outlined"
                                                    className="textfield"
                                                    required={true}
                                                    error={this.state.quantityError}
                                                    name="quantity" onBlur={e => this.isDisabled(e, "[1-9]+","quantityError")}
                                                    helperText={this.state.quantity1}
                                        />
                                    </div>
                                    <div className="text">
                                        <TextFields label="Book Price" onChange={this.changeValue} name="bookPrice"
                                                    id="price"
                                                    variant="outlined" className="textfield"
                                                    error={this.state.priceError}
                                                    required={true}
                                                    onBlur={e => this.isDisabled(e, "[1-9]+","priceError")}
                                                    helperText={this.state.price}
                                        />
                                        <TextFields label="Publishing Year" onChange={this.changeValue} id="year"
                                                    variant="outlined"
                                                    name="publishingYear"
                                                    error={this.state.yearError}
                                                    required={true}
                                                    onBlur={e => this.isDisabled(e, "^\\d{4}$","yearError")}
                                                    helperText={this.state.year}
                                                    className="textfield"
                                        />
                                    </div>
                                    <div className="description">
                                        <TextFields
                                            onBlur={e => this.isDisabled(e, "^\\w{1,250}$","descriptionError")}
                                            error={this.state.descriptionError}
                                            id="descriptionOne"
                                            helperText={this.state.descriptionOne}
                                            //helperText={"Max 250 words"}
                                            multiline rows={2} fullWidth inputProps={{maxLength: 250}}
                                            label="Description" onChange={this.changeValue}
                                            placeholder={"Max 250 words"}
                                            variant="outlined"
                                            name="description" className="textfield1"/>
                                    </div>
                                    <div className="input1">
                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            className="selectButton"
                                            multiple
                                            type="file"
                                            name="imageUrl"
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="btn">
                                        <Button variant="contained"
                                                style={{backgroundColor: "limegreen", color: "white"}}
                                                size="large" className="button"
                                                type={"submit"}
                                                startIcon={<SaveIcon/>}
                                        > Save </Button>
                                        <Button variant="contained" style={{backgroundColor: "crimson", color: "white"}}
                                                size="large" className="button"
                                                onClick={this.handleReset} startIcon={<RefreshIcon/>}> Reset </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }

            </div>
        )
    }
}

export default AdminPage;