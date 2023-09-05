import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import style from './stylesheet';
import Svg, {Defs, Mask, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const Counter = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors});

  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const full = 6;

  const startTimer = () => {
    let countDownDate = new Date('2023-09-10 19:56:25').getTime();
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      let d = Math.floor(distance / (1000 * 60 * 60 * 24));
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        console.log('finish');
      } else {
        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

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
