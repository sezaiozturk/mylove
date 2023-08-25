import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './stylesheet';

const Button = ({
  title,
  variant = 'filled',
  disabled = false,
  spreadBehavior = 'stretch',
}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const classes = styles({colors});
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={[
          classes[variant].container,
          disabled && {opacity: 0.6},
          {alignSelf: spreadBehavior},
        ]}>
        <Text style={classes[variant].title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
