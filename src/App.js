import {View, Appearance, Button, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {change, changeTheme} from './redux/theme/themeSlice';
import {changeLocale} from './redux/locale/localeSlice';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => {
    setCurrentTheme(scheme.colorScheme);
  });
  const dispatch = useDispatch();
  const colors = useSelector(({theme}) => theme.colors);
  const locale = useSelector(({locale}) => locale.locale);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(changeTheme(currentTheme));
  }, [currentTheme]);

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <Button title={locale.continue} />
      <Button title={locale.save} />
      <Button title={locale.signup} />
      <Button
        title="change language"
        onPress={() => dispatch(changeLocale())}
      />
      <Text
        style={{
          fontSize: 100,
          fontFamily: 'TiltPrism-Regular',
        }}>
        {locale.save}
      </Text>
    </View>
  );
};

const ContextApi = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ContextApi;
