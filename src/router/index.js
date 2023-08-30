import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, Signup, Tasks} from '../screens';
import auth from '@react-native-firebase/auth';

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
  const user = auth().currentUser;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={user && 'HomeTab'}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotScreen" component={ForgotPassword} />
      <Stack.Screen name="HomeTab" component={HomeTab} />
    </Stack.Navigator>
  );
};

export default Router;
