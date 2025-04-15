import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    "isLogin": false,    
    "username":"",
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLogin = true;
            state.username=action.payload.username
        },
        logout(state) {
         state.isLogin = false;
        },
    }
})

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

