import React from 'react';
import TextField from '@material-ui/core/TextField'

class CustomTextFields extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    };
}

    render() {
        return <div className="text">
        <TextField
            ref={this.props.ref}
          id="outlined-helperText"
          label={this.props.labelName}
          value={this.props.value}
          variant="outlined"
          className="textfield"
        />
        </div>;
    }
}

export default TextField;