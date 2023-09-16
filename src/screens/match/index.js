import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input} from '../../components';
import style from './stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  setUser1Info,
  setUser2Info,
  setMatchInfo,
} from '../../redux/users/usersSlice';

const Match = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [page, setPage] = useState(true);
  const [uid, setUid] = useState('');
  const dispatch = useDispatch();
  const currentUid = auth().currentUser.uid;

  const getInfo = async matchId => {
    let response;
    response = await firestore().collection('Match').doc(matchId).get();
    const match = response._data;
    const user2Id = match.uid1 == currentUid ? match.uid2 : match.uid1;

    const user1Info = await firestore()
      .collection('User')
      .doc(currentUid)
      .get();

    const user2Info = await firestore().collection('User').doc(user2Id).get();

    dispatch(setMatchInfo(match));
    dispatch(setUser1Info(user1Info._data));
    dispatch(setUser2Info(user2Info._data));

    navigation.navigate('HomeTab');
  };

  const toggleScanner = () => {
    setPage(!page);
  };

  const matchObserve = () => {
    firestore()
      .collection('User')
      .doc(currentUid)
      .onSnapshot(querySnapshot => {
        const control = querySnapshot._data.matchId;
        if (control != undefined) {
          getInfo(control);
        }
      });
  };
  const qrControl = async data => {
    if (data.length == 28 && data != currentUid) {
      const user = await firestore().collection('User').doc(data).get();
      return user._data === undefined ? 'kullanıcı bulunamadı' : true;
    } else {
      return 'geçersiz qr';
    }
  };
  const match = partnerUid => {
    const matchId = currentUid.substring(0, 14) + partnerUid.substring(14, 28);
    try {
      firestore()
        .collection('Match')
        .doc(matchId)
        .set({
          matchId,
          uid1: currentUid,
          uid2: partnerUid,
        })
        .then(() => {
          firestore()
            .collection('User')
            .doc(currentUid)
            .update({
              matchId,
            })
            .then(() => {
              firestore()
                .collection('User')
                .doc(partnerUid)
                .update({
                  matchId,
                })
                .then(() => {
                  getInfo(matchId);
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadQr = async ({data}) => {
    let response = await qrControl(data);
    if (response === true) {
      match(data);
      toggleScanner();
    } else {
      console.log(response);
    }
  };
  const handleUid = async () => {
    let response = await qrControl(uid);
    if (response === true) {
      match(uid);
    } else {
      console.log(response);
    }
  };
  useEffect(() => {
    matchObserve();
  }, []);

  return page ? (
    <View style={classes.container}>
      <View style={classes.qrContainer}>
        <View style={classes.qr}>
          <QRCode
            value={currentUid}
            color={colors.primary}
            size={200}
            backgroundColor={colors.secondary}
          />
        </View>
        <View style={classes.row}>
          <Text style={[classes.uid, typography.title2]}>{currentUid}</Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(currentUid);
            }}>
            <Text>
              <Icon name="content-copy" size={30} color={colors.primary} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={classes.seperatorContainer}>
        <View style={classes.seperator} />
        <Text style={classes.or}>or</Text>
        <View style={classes.seperator} />
      </View>
      <View style={classes.scannerContainer}>
        <View style={classes.row}>
          <View style={{flex: 1}}>
            <Input
              placeHolder={'Sevgilinizin 28 haneli kodunu giriniz...'}
              onChangeText={text => setUid(text)}
            />
          </View>
          {uid.length != 28 ? (
            <TouchableOpacity onPress={toggleScanner}>
              <Text>
                <Icon name="qrcode-scan" size={30} color={colors.primary} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleUid}>
              <Text>
                <Icon
                  name="check-circle-outline"
                  size={30}
                  color={colors.primary}
                />
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <Text style={[classes.statement, typography.title2]}>
          Sevgilinle eşleşme yapmak için size uygun olan yöntemi seçin...
        </Text>
      </View>
    </View>
  ) : (
    <View style={{flex: 1}}>
      <View style={classes.cameraContainer}>
        <Text style={[classes.title, typography.title2]}>
          Sevgilinizin kare kodunu okutunuz.
        </Text>
        <Image
          source={require('../../../assets/icons/scanner.png')}
          style={{width: 300, height: 300}}
        />

        <TouchableOpacity onPress={toggleScanner} style={classes.close}>
          <Text>
            <Icon name="close" size={22} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      <QRCodeScanner
        onRead={handleReadQr}
        flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={1000}
        cameraStyle={{height: '100%'}}
      />
    </View>
  );
};
export default Match;
