import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tasks = ({navigation}) => {
  //const classes = style();
  useEffect(() => {
    {
      AsyncStorage.getItem(auth().currentUser.email).then(res =>
        console.log('000' + res),
      );
    }
  }, []);
  return (
    <View>
      <Text style={{color: 'black', fontSize: 30}}></Text>
      <Button
        title="çık"
        onPress={() => {
          auth().signOut();
          navigation.navigate('LoginScreen');
        }}
      />
    </View>
  );
};

export default Tasks;
