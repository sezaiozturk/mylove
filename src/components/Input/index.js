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
  editable,
}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});

  return (
    <View style={classes.container}>
      {title && <Text style={[classes.title, typography.title1]}>{title}</Text>}
      <View style={classes.inputContainer}>
        <TextInput
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          style={[classes.input, typography.title2]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          placeholderTextColor={colors.gray100}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        <TouchableOpacity onPress={() => null}>
          <Text>
            <Icon name="close" size={20} color={colors.primary} />
          </Text>
        </TouchableOpacity>
      </View>
      {errors && touched && (
        <Text style={[classes.error, typography.title1]}>{errors}</Text>
      )}
    </View>
  );
};

export default Input;
