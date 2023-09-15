import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './stylesheet';

const OptionsMenu = ({menuItems, handleItem}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});

  const last = menuItems.pop();

  return (
    <View style={classes.optionsDialogContainer}>
      <View style={classes.optionsDialog}>
        {menuItems.map(item => {
          console.log(item);
          return (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  handleItem(item.status);
                }}>
                <Text style={[classes.option, typography.title2]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <View style={classes.seperator} />
            </View>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: colors.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          onPress={() => {
            handleItem(last.status);
          }}>
          <Text
            style={[classes.option, typography.title2, {color: colors.title}]}>
            {last.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionsMenu;
