import {View, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const Drawer = props => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});

  return (
    <View style={classes.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={classes.contentContainer}>
        <Image
          source={require('../../../assets/images/love.jpg')}
          style={classes.photo}
        />
        <View style={classes.itemContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={classes.footer}
        onPress={() => {
          auth().signOut();
          props.navigation.navigate('LoginScreen');
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text>
            <Icon name={'logout'} size={22} color={colors.text} />
          </Text>
          <Text style={classes.text}>Çıkış</Text>
        </View>
        <Text style={classes.text}>version 0.1(beta)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Drawer;
