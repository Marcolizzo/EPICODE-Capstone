import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import signupReducer from "../reducers/signupReducer";
import projectsReducer from "../reducers/projectsReducer";
import listsReducer from "../reducers/listsReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,

    // PROJECTS
    getProjects: projectsReducer,
    getProjectById: projectsReducer,
    createProject: projectsReducer,
    updateProject: projectsReducer,
    deleteProject: projectsReducer,

    // LISTS
    getLists: listsReducer,
    createList: listsReducer,
    updateList: listsReducer,
    deleteList: listsReducer,

    // USER
    getUserById: usersReducer,
  },
});

export default store;
