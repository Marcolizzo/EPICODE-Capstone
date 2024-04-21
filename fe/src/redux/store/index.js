import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import signupReducer from '../reducers/signupReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

export default store;