import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Input = ({
  title,
  value,
  onChangeText,
  placeHolder,
  onBlur,
  touched,
  errors,
  secureTextEntry,
}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const classes = styles({colors});

  return (
    <View style={classes.container}>
      <Text style={classes.title}>{title}</Text>
      <View style={classes.inputContainer}>
        <TextInput
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          style={classes.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          placeholderTextColor={'gray'}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={() => null}>
          <Text>
            <Icon name="close" size={20} color={colors.primary} />
          </Text>
        </TouchableOpacity>
      </View>
      {errors && touched && <Text style={classes.error}>{errors}</Text>}
    </View>
  );
};

export default Input;
