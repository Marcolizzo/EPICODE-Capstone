import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import signupReducer from '../reducers/signupReducer';
import projectsReducer from '../reducers/projectsReducer';
import usersReducer from '../reducers/usersReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    getProjects: projectsReducer,
    getUserById: usersReducer
  },
});

export default store;