import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import signupReducer from "../reducers/signupReducer";
import usersReducer from "../reducers/usersReducer";
import invitationsReducer from "../reducers/invitationsReducer";
import projectsReducer from "../reducers/projectsReducer";
import listsReducer from "../reducers/listsReducer";
import tasksReducer from "../reducers/tasksReducer";
import checklistsReducer from "../reducers/checklistsReducer";
import itemsReducer from "../reducers/itemsReducer";
import commentsReducer from "../reducers/commentsReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,

    // USER
    getUserById: usersReducer,
    updateUser: usersReducer,
    deleteUser: usersReducer,
    updateProfileImage: usersReducer,
    deleteProfileImage: usersReducer,
    updatePassword: usersReducer,

    // INVITATIONS
    getInvitations: invitationsReducer,
    getInvitationById: invitationsReducer,
    createInvitation: invitationsReducer,
    updateInvitation: invitationsReducer,
    deleteInvitation: invitationsReducer,

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

    // ITEMS
    getItems: itemsReducer,
    getItemById: itemsReducer,
    createItem: itemsReducer,
    updateItem: itemsReducer,
    deleteItem: itemsReducer,

    // COMMENTS
    getComments: commentsReducer,
    getCommentById: commentsReducer,
    createComment: commentsReducer,
    updateComment: commentsReducer,
    deleteComment: commentsReducer,
  },
});

export default store;
