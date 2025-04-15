import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from '../features/AuthSlice';
import PrefrencesReducer from '../features/PreferencesSlice';

const store = configureStore({
  reducer: {
        auth: AuthReducer,
        preferences:PrefrencesReducer
  },
});

export default store