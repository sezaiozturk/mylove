import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TopBar} from '../../components';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import style from './stylesheet';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import useCalendar from '../../hooks/useCalendar/useCalendar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';

const Counter = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const user1 = useSelector(({users}) => users.user1Info);
  const match = useSelector(({users}) => users.matchInfo);
  const classes = style({colors});
  const nowTime = new Date().getTime();
  const [fill, setFill] = useState(0);

  const {
    showDatePicker,
    hidePicker,
    startTimer,
    pickerMode,
    inline,
    full,
    days,
    hours,
    minutes,
    seconds,
  } = useCalendar();

  const saveEndDate = async endDate => {
    try {
      firestore()
        .collection('Match')
        .doc(user1.matchId)
        .update({
          counterStart: nowTime,
          counterEnd: endDate,
        })
        .then(() => {
          //save complated
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startTimer(match.counterStart, match.counterEnd);
  }, []);
  useEffect(() => {
    if (days != 0) {
      setFill((100 / full) * days);
    }
  }, [days]);

  return (
    <View style={classes.container}>
      <TopBar
        title={'Kaç gün Kaldı'}
        leftName={'menu'}
        rightName={'calendar-month'}
        leftIcon={() => {
          navigation.openDrawer();
        }}
        rightIcon={showDatePicker}
      />
      <View style={classes.contentContainer}>
        <AnimatedCircularProgress
          size={180}
          width={8}
          fill={fill}
          tintColor={colors.primary}
          onAnimationComplete={() =>
            /*console.log('onAnimationComplete')*/ null
          }
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
        <DateTimePickerModal
          isVisible={pickerMode !== null}
          mode={pickerMode}
          onConfirm={date => {
            hidePicker();
            saveEndDate(date.getTime());
            startTimer(nowTime, date.getTime());
          }}
          onCancel={hidePicker}
          display={inline ? 'inline' : undefined}
        />
      </View>
    </View>
  );
};

export default Counter;
