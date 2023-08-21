import {View, Text, Button, Appearance} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {change, changeTheme} from './redux/theme/themeSlice';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => {
    setCurrentTheme(scheme.colorScheme);
  });
  const dispatch = useDispatch();
  const colors = useSelector(({theme}) => theme.colors);

  useEffect(() => {
    dispatch(changeTheme(currentTheme));
  }, [currentTheme]);

  return <View style={{flex: 1, backgroundColor: colors.secondary}}></View>;
};

const ContextApi = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ContextApi;
