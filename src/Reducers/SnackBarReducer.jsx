const initialState = {
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarType: "success",
};

const SnackBarRedcuer = (state = initialState, action) => {
  switch (action.type) {
    case "SNACKBAR_SHOW":
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarType: action.snackbarType,
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
};

export default SnackBarRedcuer;
