import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';

const Button = ({
  spreadBehavior = 'stretch',
  iconColor = 'white',
  variant = 'filled',
  disabled = false,
  iconSize = 30,
  reverse = false,
  onPress,
  title,
  icon,
  loading,
}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const classes = styles({colors});
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          classes[variant].container,
          (disabled || loading) && {opacity: 0.6},
          {alignSelf: spreadBehavior},
          reverse && {flexDirection: 'row-reverse'},
        ]}>
        {loading && (
          <Text>
            <Icon name={'clock-outline'} size={25} color={'white'} />
          </Text>
        )}
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
