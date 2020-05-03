import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import TextFields from './TextFields'
import '../Css/AddBookForm.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


class AdminPage extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    };
}
    render() {
        return(
    <div className="main">
    <FormControl className="root">
      <h2>Add Book Form</h2>
    <div className="formContent">
    <div className="text">
      <TextFields label="BookName"  variant="outlined" className="textfield"/>
    </div>
    <div className="text">
      <TextFields label="AuthorName"  variant="outlined" className="textfield"/>
    </div>  
    <div className="text">
      <TextFields label="Description"  variant="outlined" className="textfield"/>
    </div>  
    <div className="text">
      <TextFields label="ISBN"  variant="outlined" className="textfield"/>
    </div>  
    <div className="text">
      <TextFields label="Quantity"  variant="outlined" className="textfield"/>
    </div> 
    <div className="text">
      <TextFields label="Book Price"  variant="outlined" className="textfield"/>
    </div>  
    <div className="text">
      <TextFields label="Publishing Year"  variant="outlined" className="textfield"/>
    </div>  
      <div className="input1">
        <input
        accept="image/*"
        className="input"
        id="contained-button-file"
        multiple
        type="file"
      />
      </div>
        <div className="btn">
        <Button
        variant="contained"
        style={{backgroundColor:"limegreen",color:"white"}}
        size="large"
        className="button"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
        <Button
        variant="contained"
        style={{backgroundColor:"crimson",color:"white"}}
        size="large"
        className="button1"
        startIcon={<CancelOutlinedIcon />}
      >
        Cancel
      </Button>
        </div>
        </div>
    </FormControl>
    </div>
    )
    }
}

export default AdminPage;

