import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = ({leftIcon, rightIcon, title, leftName, rightName}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});

  return (
    <View style={classes.container}>
      <TouchableOpacity onPress={leftIcon}>
        <Text>
          <Icon name={leftName} size={25} color={colors.secondary} />
        </Text>
      </TouchableOpacity>
      <Text style={[classes.title, typography.header2]}>{title}</Text>
      <TouchableOpacity>
        <Text onPress={rightIcon}>
          <Icon name={rightName} size={25} color={colors.secondary} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
