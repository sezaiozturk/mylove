import {Appearance} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {changeTheme} from './redux/theme/themeSlice';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Router from './router';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => {
    setCurrentTheme(scheme.colorScheme);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
    dispatch(changeTheme(currentTheme));
  }, [currentTheme]);

  return <Router />;
};

const ContextApi = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
};

export default ContextApi;
