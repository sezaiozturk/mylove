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
  const {showDatePicker, hidePicker, pickerMode, inline, full} = useCalendar(
    startDay,
    nowTime,
  );
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
        <MaskedView
          style={classes.maskedContainer}
          maskElement={
            <View style={classes.masked}>
              <Image
                source={require('../../../assets/icons/heart.png')}
                style={classes.heart}
              />
            </View>
          }>
          <Image
            source={{
              uri: user1.downloadUrl,
            }}
            style={classes.photo}
          />
        </MaskedView>
        <MaskedView
          style={classes.maskedContainer}
          maskElement={
            <View style={classes.masked}>
              <Image
                source={require('../../../assets/icons/heart.png')}
                style={classes.heart}
              />
            </View>
          }>
          <Image
            source={{
              uri: user2.downloadUrl,
            }}
            style={classes.photo}
          />
        </MaskedView>
      </View>
      <View style={classes.dayContainer}>
        <Text
          style={[
            classes.text,
            typography.header2,
          ]}>{`${user1.name} & ${user2.name}`}</Text>
        <Text style={classes.day}>{full}</Text>
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
          setStartDay(date.getTime());
          saveStartDate(date.getTime());
        }}
        onCancel={hidePicker}
        display={inline ? 'inline' : undefined}
      />
    </View>
  );
};

export default Day;
