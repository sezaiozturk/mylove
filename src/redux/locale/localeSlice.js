import {createSlice} from '@reduxjs/toolkit';
import locales from '../../locales';

let currentLocale = 'tr';
const initialState = {
  locale: locales[0].translations,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeLocale: state => {
      state.locale =
        currentLocale === 'tr'
          ? locales[0].translations
          : locales[1].translations;
      currentLocale = currentLocale === 'tr' ? 'en' : 'tr';
    },
  },
});
export const {changeLocale} = localeSlice.actions;

export default localeSlice.reducer;
