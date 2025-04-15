import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    "isLogin": false,    
    "username":"",
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
         state.loggedIn = false;
        },
    }
})

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

