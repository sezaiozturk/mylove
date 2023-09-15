import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React, {useState} from 'react';

const Todo = ({id, task, status = 'wait', userId, handleTask}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const user1 = useSelector(({users}) => users.user1Info);
  const classes = styles({colors});
  return (
    <TouchableOpacity
      key={id}
      activeOpacity={1}
      onLongPress={() => handleTask({id, task, status, userId})}
      style={[
        classes[status].container,
        //user1.uid == userId ? {marginLeft: 40} : {marginRight: 40},
      ]}>
      <Text style={[classes[status].task, typography.title2]}>{task}</Text>
    </TouchableOpacity>
  );
};

export default Todo;
