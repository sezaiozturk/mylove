import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Counter,
  Day,
  ForgotPassword,
  Login,
  Match,
  Profile,
  Signup,
  Tasks,
} from '../screens';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {
  setMatchId,
  setUser1Id,
  setUser2Id,
  setUser1Info,
  setUser2Info,
  setMatchInfo,
} from '../redux/users/usersSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DayScreen" component={Day} />
      <Tab.Screen name="CounterScreen" component={Counter} />
      <Tab.Screen name="TasksScreen" component={Tasks} />
    </Tab.Navigator>
  );
};
const Router = () => {
  const [initial, setInitial] = useState(null);
  const currentUser = auth().currentUser;
  const dispatch = useDispatch();
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
      if (response._data === undefined) {
        //initial profile screen
        setInitial('ProfileScreen');
      } else {
        if (response._data.matchId === undefined) {
          //initial match screen
          setInitial('MatchScreen');
        } else {
          //initial homeTab screen
          getInfo(response._data);
          //herşey tamam
          //tüm veriler=response._data
        }
      }
    } else {
      //initial login screen
      setInitial('LoginScreen');
      SplashScreen.hide();
    }
  };
  const getInfo = async data => {
    let response;
    response = await firestore().collection('Match').doc(data.matchId).get();
    const match = response._data;
    const user2Id = match.uid1 == currentUser.uid ? match.uid2 : match.uid1;

    response = await firestore().collection('User').doc(user2Id).get();

    //dispatch(setMatchId(data.matchId));
    //dispatch(setUser1Id(currentUser.uid));
    //dispatch(setUser2Id(user2Id));
    dispatch(setMatchInfo(match));
    dispatch(setUser1Info(data));
    dispatch(setUser2Info(response._data));
    setInitial('HomeTab');
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
