import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import style from './stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {nameSchema} from '../authentication/validationSchema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const Match = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});

  const [page, setPage] = useState(true);
  const currentUid = auth().currentUser.uid;

  const toggleScanner = () => {
    setPage(!page);
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
                  navigation.navigate('HomeTab');
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
            <Input />
          </View>
          <TouchableOpacity onPress={toggleScanner}>
            <Text>
              <Icon name="qrcode-scan" size={30} color={colors.primary} />
            </Text>
          </TouchableOpacity>
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

/*
      <Button
        title="Copy "
        onPress={() => {
          Clipboard.setString('olmadıı');
        }}
      />
      <Button
        title="Paste "
        onPress={async () => {
          const text = await Clipboard.getString();
          setCopiedText(text);
          console.log(copiedText);
        }}
        {copiedText && (
        
      )}
     
      />*/
