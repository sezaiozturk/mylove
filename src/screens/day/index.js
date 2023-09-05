import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import style from './stylesheet';
import MaskedView from '@react-native-masked-view/masked-view';

const Day = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors});

  return (
    <View style={classes.container}>
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
            source={require('../../../assets/images/myPhoto.jpeg')}
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
            source={require('../../../assets/images/myPhoto.jpeg')}
            style={classes.photo}
          />
        </MaskedView>
      </View>
      <View style={classes.dayContainer}>
        <Text style={[classes.text, typography.header2]}>Sezai & Saide</Text>
        <Text style={classes.day}>240</Text>
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
    </View>
  );
};

<MaskedView
  style={{flex: 1, flexDirection: 'row', height: '100%'}}
  maskElement={
    <View
      style={{
        // Transparent background because mask is based off alpha channel.
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 60,
          color: 'black',
          fontWeight: 'bold',
        }}>
        Basic Mask
      </Text>
    </View>
  }>
  {/* Shows behind the mask, you can put anything here, such as an image */}
  <View style={{flex: 1, height: '100%', backgroundColor: '#324376'}} />
  <View style={{flex: 1, height: '100%', backgroundColor: '#F5DD90'}} />
  <View style={{flex: 1, height: '100%', backgroundColor: '#F76C5E'}} />
  <View style={{flex: 1, height: '100%', backgroundColor: '#e1e1e1'}} />
</MaskedView>;

export default Day;
