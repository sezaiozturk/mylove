import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import style from './stylesheet';
import Svg, {Defs, Mask, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import useCalendar from '../../hooks/useCalendar/useCalendar';

const Counter = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors});
  const {days, hours, minutes, seconds, full} = useCalendar(
    new Date('2023-09-5 12:41:25').getTime(),
    new Date('2023-09-12 12:45:25').getTime(),
  );

  useEffect(() => {}, []);

  return (
    <View style={classes.container}>
      <AnimatedCircularProgress
        size={180}
        width={8}
        fill={(days * 100) / full}
        tintColor={colors.primary}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor={colors.secondary}>
        {() => (
          <View style={classes.circle}>
            <Text style={classes.day}>{days}</Text>
            <Text style={classes.ratio}>{`${days} / ${full}`}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={classes.row}>
        <View style={classes.column}>
          <Text style={classes.number}>{hours}</Text>
          <Text style={[classes.title, typography.title2]}>HOURS</Text>
        </View>
        <View style={classes.column}>
          <Text style={classes.number}>{minutes}</Text>
          <Text style={[classes.title, typography.title2]}>MINUTES</Text>
        </View>
        <View style={classes.column}>
          <Text style={classes.number}>{seconds}</Text>
          <Text style={[classes.title, typography.title2]}>SECONDS</Text>
        </View>
      </View>
    </View>
  );
};

export default Counter;
