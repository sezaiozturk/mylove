import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import style from './stylesheet';
import MaskedView from '@react-native-masked-view/masked-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from '../../hooks/useCalendar/useCalendar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const Day = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors});
  const user1 = useSelector(({users}) => users.user1Info);
  const user2 = useSelector(({users}) => users.user2Info);
  const match = useSelector(({users}) => users.matchInfo);
  const nowTime = new Date().getTime();
  const [startDay, setStartDay] = useState(match.startDate);
  const {showDatePicker, hidePicker, pickerMode, inline, days, distanceDay} =
    useCalendar();

  useEffect(() => {
    startDay != undefined ? setStartDay(distanceDay(startDay, nowTime)) : null;
  }, []);

  const saveStartDate = async startDate => {
    try {
      firestore()
        .collection('Match')
        .doc(user1.matchId)
        .update({
          startDate,
        })
        .then(() => {
          //save complated
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={classes.container}>
      <TouchableOpacity onPress={showDatePicker} style={classes.calendar}>
        <Text>
          <Icon name="calendar-month" size={30} color={colors.primary} />
        </Text>
      </TouchableOpacity>

      <View style={classes.photoContainer}>
        <View>
          <Image
            source={require('../../../assets/icons/heartLight.png')}
            style={{
              width: 200,
              height: 180,
              position: 'relative',
            }}
          />
          <Image
            source={{uri: user2.downloadUrl}}
            style={{
              width: 200,
              height: 180,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: -1,
            }}
          />
        </View>
      </View>

      <View style={classes.dayContainer}>
        <Text
          style={[
            classes.text,
            typography.header2,
          ]}>{`${user1.name} & ${user2.name}`}</Text>
        <Text style={classes.day}>
          {startDay === undefined ? days : startDay}
        </Text>
        <Text style={[classes.text, typography.header2]}>
          Gündür Birlikteyiz...
        </Text>
      </View>
      <View style={classes.sentenceContainer}>
        <Text style={[classes.text, typography.title1]}>
          Dünyaya bin kez daha gelecek olsam, bin kez daha arar, bulur, severim
          seni.
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={date => {
          hidePicker();
          distanceDay(date.getTime(), nowTime);
          saveStartDate(date.getTime());
        }}
        onCancel={hidePicker}
        display={inline ? 'inline' : undefined}
      />
    </View>
  );
};

export default Day;
