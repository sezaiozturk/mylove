import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React, {useState} from 'react';

const Todo = ({task, status = 'wait', onPress}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});
  return (
    <TouchableOpacity onPress={onPress} style={classes[status].container}>
      <Text style={[classes[status].task, typography.title2]}>{task}</Text>
    </TouchableOpacity>
  );
};

export default Todo;
