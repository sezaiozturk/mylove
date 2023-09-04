import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React, {useState} from 'react';

const RadioButton = ({id, active, onPress, title}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});
  return (
    <View style={classes.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={classes.circle}>
          {active == id && <View style={classes.innerCircle} />}
        </View>
      </TouchableOpacity>
      <Text style={[classes.title, typography.title2]}>{title}</Text>
    </View>
  );
};

export default RadioButton;
