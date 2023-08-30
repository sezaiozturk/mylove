import {View, Text} from 'react-native';
import React from 'react';
import style from './stylesheet';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';

const Tasks = ({navigation}) => {
  return (
    <View>
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
