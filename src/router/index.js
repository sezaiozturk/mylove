import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, Match, Profile, Signup, Tasks} from '../screens';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TasksScreen" component={Tasks} />
      <Tab.Screen name="TasksScreen2" component={Tasks} />
    </Tab.Navigator>
  );
};
const Router = () => {
  const [initial, setInitial] = useState(null);
  const currentUser = auth().currentUser;
  useEffect(() => {
    accountControl(currentUser);
  }, []);

  const accountControl = async currentUser => {
    if (currentUser != null) {
      const response = await firestore()
        .collection('User')
        .doc(currentUser.uid)
        .get();
      SplashScreen.hide();
      console.log(response);
      if (response._data === undefined) {
        //initial profile screen
        setInitial('ProfileScreen');
      } else {
        if (response._data.matchId === undefined) {
          //initial match screen
          setInitial('MatchScreen');
        } else {
          //initial homeTab screen
          setInitial('HomeTab');
        }
      }
    } else {
      //initial login screen
      setInitial('LoginScreen');
      SplashScreen.hide();
    }
  };

  return initial != null ? (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initial}>
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="ForgotScreen" component={ForgotPassword} />
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="MatchScreen" component={Match} />
      <Stack.Screen name="HomeTab" component={HomeTab} />
    </Stack.Navigator>
  ) : null;
};

export default Router;
