import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import localeSlice from './locale/localeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeSlice,
  },
});
