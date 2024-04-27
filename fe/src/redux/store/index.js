import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import signupReducer from "../reducers/signupReducer";
import usersReducer from "../reducers/usersReducer";
import projectsReducer from "../reducers/projectsReducer";
import listsReducer from "../reducers/listsReducer";
import tasksReducer from "../reducers/tasksReducer";
import checklistsReducer from "../reducers/checklistsReducer";

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
    getListById: listsReducer,
    createList: listsReducer,
    updateList: listsReducer,
    deleteList: listsReducer,

    // TASKS
    getTasks: tasksReducer,
    getTaskById: tasksReducer,
    createTask: tasksReducer,
    updateTask: tasksReducer,
    deleteTask: tasksReducer,

    // CHECKLISTS
    getChecklists: checklistsReducer,
    getChecklistById: checklistsReducer,
    createChecklist: checklistsReducer,
    updateChecklist: checklistsReducer,
    deleteChecklist: checklistsReducer,
  },
});

export default store;
