import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";

export default function CustomSnackBar(props) {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }}  open={open} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}