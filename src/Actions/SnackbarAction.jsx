export const showSnackbar =(message,snackbarType)=>{
    return dispatch=>{
        dispatch({type:"SNACKBAR_SHOW",message,snackbarType})
    }
}
export const clearSnackbar =()=>{
    return dispatch=>{
        dispatch({type: "SNACKBAR_CLEAR"})
    }
}