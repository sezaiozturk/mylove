import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import localeSlice from './locale/localeSlice';
import usersSlice from './users/usersSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeSlice,
    users: usersSlice,
  },
});
