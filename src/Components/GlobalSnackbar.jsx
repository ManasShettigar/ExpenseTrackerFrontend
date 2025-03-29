import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { clearSnackbar } from "../Actions/SnackbarAction";

export default function GlobalSnackbar() {
    const dispatch = useDispatch();
    const { snackbarMessage, snackbarOpen, snackbarType } = useSelector(state => state.SnackBarRedcuer);

    const handleClose = () => {
        dispatch(clearSnackbar());
    };

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top', // 'top' or 'bottom'
                horizontal: 'right', // 'left', 'center', or 'right'
            }}

        >
            <Alert onClose={handleClose} severity={snackbarType}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}