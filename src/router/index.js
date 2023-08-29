import {View, Text, Button} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, Signup, Tasks} from '../screens';

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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotScreen" component={ForgotPassword} />
      <Stack.Screen name="HomeTab" component={HomeTab} />
    </Stack.Navigator>
  );
};

export default Router;
