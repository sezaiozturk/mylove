import {View, Text, Button} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Signup} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Tab.Navigator>
  );
};

export default Router;
