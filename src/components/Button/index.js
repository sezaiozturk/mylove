import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';

const Button = ({
  spreadBehavior = 'stretch',
  iconColor = 'white',
  variant = 'filled',
  disabled = false,
  iconSize = 25,
  reverse = false,
  title,
  icon,
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
          reverse && {flexDirection: 'row-reverse'},
        ]}>
        {icon && (
          <Text>
            <Icon name={icon} size={iconSize} color={iconColor} />
          </Text>
        )}
        {title && <Text style={classes[variant].title}>{title}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
