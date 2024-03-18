import { configureStore } from "@reduxjs/toolkit";
import dialogsReducer from "./dialogsReducer";
import profilesReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { reducer as formReducer } from 'redux-form';

const store = configureStore({
    reducer: {
        dialogs: dialogsReducer,
        profile: profilesReducer,
        users: usersReducer,
        auth: authReducer,
        form: formReducer,
    },
    //configureStore API already adds the thunk middleware by default
});

export default store;