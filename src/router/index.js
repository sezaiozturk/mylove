import {View, Text, Button} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, Signup} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotScreen" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default Router;
