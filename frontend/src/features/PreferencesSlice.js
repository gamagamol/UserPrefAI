import { createSlice } from '@reduxjs/toolkit';
import languanges from '../store/languanges';

const initialState = {
    "isDarkTheme": false,
    "language": "japan",
    "isEnabledNotification": false,
    "languangeList": ["english", "indonesia", "japan"],
    "lang": {
        "greetings": "Welcome Back",
        "notification": "Notification",
        "theme": "Dark Theme",
        "languanges": "Languanges",
        "preferencesTitle":"User Prefrences"
    }
}
const preferencesSlice = createSlice({
    name: "Preferences",
    initialState,
    reducers: {
        updatePreferences(state, action) {
            state.isDarkTheme = (action.payload.isDarkTheme == undefined) ?   state.isDarkTheme : action.payload.isDarkTheme ;
            state.language=action.payload.language == undefined ?   state.language : action.payload.language
            state.isEnabledNotification = action.payload.isEnabledNotification == undefined ? state.isEnabledNotification : action.payload.isEnabledNotification
            state.lang= action.payload.language == undefined ? languanges(state.language) : languanges(action.payload.language)
           
        },
       
    }
});

export const { updatePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
  