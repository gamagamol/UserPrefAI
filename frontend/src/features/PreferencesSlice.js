import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "isDarkTheme": false,
    "language": "japan",
    "isEnabledNotification": false,
    "languangeList": ["english","indonesia","japan"]
}
const preferencesSlice = createSlice({
    name: "Preferences",
    initialState,
    reducers: {
        updatePreferences(state, action) {
            state.isDarkTheme = (action.payload.isDarkTheme == undefined) ?   state.isDarkTheme : action.payload.isDarkTheme ;
            state.language=action.payload.language == undefined ?   state.language : action.payload.language
            state.isEnabledNotification=action.payload.isEnabledNotification == undefined ? state.isEnabledNotification : action.payload.isEnabledNotification
           
        },
       
    }
});

export const { updatePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
  