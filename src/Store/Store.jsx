import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'; // Optional middleware for async actions
import SnackBarRedcuer from '../Reducers/SnackBarReducer';
import authReducer from '../Reducers/AuthTokenReducer';
export default configureStore({
    reducer: {SnackBarRedcuer: SnackBarRedcuer,auth: authReducer,}
  })
  
  