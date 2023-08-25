import {View, Text, Image} from 'react-native';
import React from 'react';
import {Button} from '../../components';

const Login = () => {
  return (
    <View>
      <Button title={'Kaydet'} />
      <Button title={'Kaydet'} variant="outlined" />
      <Button title={'Kaydet'} variant="ghost" />
      <Button title={'Disable'} disabled />
      <Button title={'deneme'} spreadBehavior="baseline" />
      <Button
        title={'Ghot'}
        variant="ghost"
        spreadBehavior="baseline"
        icon="send"
        iconColor="purple"
        iconSize={30}
      />
      <Button title={'Ghot'} icon="send" reverse />
    </View>
  );
};

export default Login;
