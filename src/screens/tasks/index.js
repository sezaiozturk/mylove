import {
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input, OptionsMenu, Todo} from '../../components';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tasks = ({navigation}) => {
  const task = [{task: 'sinema git'}, {task: 'tiyatro'}, {task: 'yemek ye'}];
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});
  const [infoToggle, setInfoToggle] = useState(false);
  const [inputToggle, setInputToggle] = useState(false);
  const [optionsToggle, setOptionsToggle] = useState(false);
  const info = [
    {
      id: 0,
      task: 'Cevap bekliyor...',
      status: 'wait',
    },
    {
      id: 1,
      task: 'Tamam yapabiliriz...',
      status: 'yes',
    },
    {
      id: 2,
      task: 'Hayır istemiyorum...',
      status: 'no',
    },
    {
      id: 3,
      task: 'Seninle gerçekleştirmek çok güzeldi...',
      status: 'complete',
    },
  ];
  const DATA = [
    {
      title: 'kahvaltı yap',
      status: 'yes',
    },
    {
      title: 'kahvaltı yap',
      status: 'no',
    },
    {
      title: 'kahvaltı yap',
      status: 'complete',
    },
    {
      title: 'kahvaltı yap',
      status: 'complete',
    },
  ];
  const options = [
    {
      title: 'Tamam:)',
      id: 0,
    },
    {
      title: 'Hayırr, olmaz !',
      id: 1,
    },
    {
      title: 'Sil çabuk...',
      id: 2,
    },
    {
      title: 'Bu anı yaşadık',
      id: 3,
    },
  ];

  useEffect(() => {
    {
      AsyncStorage.getItem(auth().currentUser.email).then(res =>
        console.log('000' + res),
      );
    }
  }, []);
  return (
    <View style={classes.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Todo task={item.title} status={item.status} />}
        keyExtractor={item => item.id}
        style={{
          marginVertical: 10,
          paddingTop: 5,
        }}
      />

      <TouchableOpacity
        style={classes.float}
        onPress={() => {
          //setInfoToggle(!infoToggle);
          //setInputToggle(!inputToggle);
          setOptionsToggle(!optionsToggle);
        }}>
        <Text>
          <Icon name="plus" size={25} color={colors.secondary} />
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoToggle}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setInfoToggle(!infoToggle);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInfoToggle(!infoToggle)}
          style={classes.infoContainer}>
          <View style={classes.infoDialog}>
            <Text style={[classes.title, typography.title2]}>Ne Demek ?</Text>
            {info.map(item => {
              return <Todo task={item.task} status={item.status} />;
            })}
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={inputToggle}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setInputToggle(!inputToggle);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInputToggle(!inputToggle)}
          style={classes.inputContainer}>
          <View style={classes.inputDialog}>
            <TextInput
              style={{
                borderWidth: 2,
                color: 'black',
                borderColor: 'red',
                textAlign: 'left',
              }}
              multiline={true}
            />
            <Input placeHolder={'sezai'} />
            <Button title="Kaydet" />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={optionsToggle}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          //setInputToggle(!inputToggle);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOptionsToggle(!optionsToggle)}
          style={classes.optionsContainer}>
          <Todo task={'denmee'} />
          <OptionsMenu menuItems={options} handleItem={id => console.log(id)} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Tasks;

/**
 *  <View
        style={{
          width: 400,
          height: 400,
          backgroundColor: 'rgba(0,0,0,0.75)',
          position: 'absolute',
        }}></View>
 */
