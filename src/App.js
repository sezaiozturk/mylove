import {View, Appearance, Button, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {change, changeTheme} from './redux/theme/themeSlice';
import {changeLocale} from './redux/locale/localeSlice';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ContextApi = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const HomeScreen = () => {
  const colors = useSelector(({theme}) => theme.colors);
  const locale = useSelector(({locale}) => locale.locale);
  return (
    <View>
      <Button
        title={locale.save}
        onPress={() => {
          dispatch(changeLocale());
        }}
      />
      <Button
        title={locale.save}
        onPress={() => {
          dispatch(changeLocale());
        }}
      />
      <View
        style={{
          backgroundColor: colors.primary,
          width: 100,
          height: 100,
        }}></View>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 100,
          height: 100,
        }}></View>
    </View>
  );
};

const HomeScreen2 = () => {
  const colors = useSelector(({theme}) => theme.colors);
  const locale = useSelector(({locale}) => locale.locale);
  return (
    <View>
      <Button title={locale.save} onPress={() => {}} />
      <View
        style={{
          backgroundColor: colors.primary,
          width: 100,
          height: 100,
        }}></View>
    </View>
  );
};

export default ContextApi;
