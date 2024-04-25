import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import signupReducer from "../reducers/signupReducer";
import usersReducer from "../reducers/usersReducer";
import projectsReducer from "../reducers/projectsReducer";
import listsReducer from "../reducers/listsReducer";
import tasksReducer from "../reducers/tasksReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,

    // USER
    getUserById: usersReducer,

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

    // TASKS
    getTasks: tasksReducer,
    getTaskById: tasksReducer,
    createTask: tasksReducer,
    updateTask: tasksReducer,
    deleteTask: tasksReducer,
  },
});

export default store;
