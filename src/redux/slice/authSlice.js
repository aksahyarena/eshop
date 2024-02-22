import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoggedIn: false,
    userName: null,
    email: null,
    userID: null,
    isAdmin:false
}
const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        // Action SET_ACTIVE_USER 
        SET_ACTIVE_USER: (state, action) => { // SET_ACTIVE_USER is the action

            const {SesEmail,SesID,isAdmin}=action.payload;
            state.isLoggedIn=true;
            state.email=SesEmail;
            state.userName=SesEmail;
            state.userID=SesID;
            state.isAdmin=isAdmin;
           console.log("admin state is ",state.isAdmin)
        },

        // Action REMOVE_ACTIVE_USER 
        REMOVE_ACTIVE_USER(state){
            state.isLoggedIn=false;
            state.email=null;
            state.userName=null;
            state.userID=null;
            state.isAdmin=false;
        }
    }
})

// format of export the state data
//export const variableName=(state)=>state."name" feild of slice."Data which you want to export for example isLOggedIn"

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const userName = (state) => state.auth.userName;
export const email = (state) => state.auth.email;
export const userID = (state) => state.auth.userID;
// export const isAdminOrNOt = (state) => state.auth.isAdmin;
export const isAdminOrNot = (state) => state.auth.isAdmin;

//format to export the actions 
//export const {nameOfAction}=authSlice.actions
export const { SET_ACTIVE_USER,REMOVE_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer

