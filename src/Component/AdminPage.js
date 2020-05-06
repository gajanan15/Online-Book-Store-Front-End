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

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: "", authorName: "", description: "", isbn: "",
            quantity: "", bookPrice: "", publishingYear: "", imageUrl: "",
            book: "", author: "", Isbn: "", descriptionOne: "",
            year: "", quantity1: "", price: "", err: "", abc: "", flag: false
        };
    }

    handleReset = (e) => {
        this.refs.form.reset();
    }
    myData = () => {
        const DTOdata = {
            bookName: this.state.bookName,
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
            new AdminService().addbook(this.myData())
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

    isDisabled = (event, pattern, msg) => {
        if (!event.target.value.match(pattern)) {
            this.setState({
                [event.target.id]: `invalid ${event.target.name}`,
                err: true,
            })
            console.log(this.state.err)
        } else {
            this.setState({
                [event.target.id]: "",
                err: false,
            })
        }
    }

    render() {
        return (
            <div>
                <CbHeader/>
                <div className="mainform">
                    <h2>Add Book Form</h2>
                    <Card className="maincard" variant="outlined" style={{border: "2px solid black"}}>
                        <CardContent>
                            <form className="root" ref="form" onSubmit={(e) => this.handleSave(e)}>

                                <div className="formContent">
                                    <div className="text">
                                        <TextFields
                                            style={{marginBottom: '10px'}}
                                            required={true}
                                            error={this.state.book}
                                            name="Book Name" label="Book Name" onChange={this.changeValue} id="book"
                                            variant="outlined"
                                            className="textfield" onBlur={e => this.isDisabled(e, "[a-zA-Z]+")}
                                            helperText={this.state.book}
                                        />
                                        <TextFields
                                            required={true}
                                            error={this.state.author}
                                            label="Author Name" onChange={this.changeValue} name="authorName"
                                            id="author"
                                            helperText={this.state.author}
                                            variant="outlined" className="textfield"
                                            onBlur={e => this.isDisabled(e, "^[A-Za-z]+[ ]*[A-Za-z]*$")}
                                        />
                                    </div>
                                    <div className="text">
                                        <TextFields
                                            style={{marginBottom: '10px'}}
                                            required={true}
                                            label="ISBN" name="ISBN" id="Isbn" onChange={this.changeValue}
                                            variant="outlined" className="textfield"
                                            error={this.state.Isbn}
                                            onBlur={e => this.isDisabled(e, "^\\w{13}$")} helperText={this.state.Isbn}
                                        />
                                        <TextFields label="Quantity" onChange={this.changeValue} id="quantity1"
                                                    variant="outlined"
                                                    className="textfield"
                                                    required={true}
                                                    error={this.state.quantity1}
                                                    name="Quantity" onBlur={e => this.isDisabled(e, "[1-9]+")}
                                                    helperText={this.state.quantity1}
                                        />
                                    </div>
                                    <div className="text">
                                        <TextFields label="Book Price" onChange={this.changeValue} name="Book Price"
                                                    id="price"
                                                    style={{marginBottom: '10px'}}
                                                    variant="outlined" className="textfield"
                                                    error={this.state.price}
                                                    required={true}
                                                    onBlur={e => this.isDisabled(e, "[1-9]+")}
                                                    helperText={this.state.price}
                                        />
                                        <TextFields label="Publishing Year" onChange={this.changeValue} id="year"
                                                    variant="outlined"
                                                    name="Publishing Year" style={{marginBottom: '10px'}}
                                                    error={this.state.year}
                                                    required={true}
                                                    onBlur={e => this.isDisabled(e, "^\\d{4}$")}
                                                    helperText={this.state.year}
                                                    className="textfield"
                                        />
                                    </div>
                                    <div className="description">
                                        <TextFields
                                            onBlur={e => this.isDisabled(e, "^\\w{1,250}$")}
                                            error={this.state.descriptionOne}
                                            id="descriptionOne"
                                            helperText={this.state.descriptionOne}
                                            multiline rows={2} fullWidth inputProps={{maxLength: 250}}
                                            label="Description" onChange={this.changeValue}
                                            variant="outlined"
                                            name="Description" className="textfield1"/>
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
            </div>
        )
    }
}
export default AdminPage;