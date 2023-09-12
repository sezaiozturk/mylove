import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input, OptionsMenu, Todo} from '../../components';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {randomUUID} from '../../utils';
import firestore from '@react-native-firebase/firestore';

const Tasks = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = styles({colors});
  const match = useSelector(({users}) => users.matchInfo);
  const [infoToggle, setInfoToggle] = useState(false);
  const [inputToggle, setInputToggle] = useState(false);
  const [optionsToggle, setOptionsToggle] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    task: 'dfsdf',
    status: 'yes',
  });
  const [isRender, setisRender] = useState(false);
  const [task, setTask] = useState([]);
  const [load, setLoad] = useState(false);

  const [todo, setTodo] = useState('');

  const saveTaskStatus = optionsId => {
    setOptionsToggle(!optionsToggle);

    /* const newData = veri.map(item => {
      if (item.id == selectedTask.id) {
        item.status = 'yes';
        return item;
      }
      return item;
    });
    setVeri(newData);
    setisRender(!isRender);*/
  };
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
  const saveTodo = async () => {
    const uuid = randomUUID();
    if (todo != '') {
      try {
        setLoad(true);
        firestore()
          .collection('Tasks')
          .doc(uuid)
          .set({
            uuid,
            task: todo,
            matchId: match.matchId,
            status: 'wait',
            date: new Date(),
          })
          .then(() => {
            setInputToggle(!inputToggle);
            setLoad(false);
          });
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    } else {
      console.log('boş olamaz');
    }
  };
  const getTodo = () => {
    firestore()
      .collection('Tasks')
      .onSnapshot(querySnapshot => {
        let x = [];
        querySnapshot.forEach(async documentSnapshot => {
          const obj = {
            ...documentSnapshot.data(),
          };
          x.push(obj);
        });
        x.sort(function (a, b) {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        });
        setTask(x);
      });
  };

  useEffect(() => {
    {
      AsyncStorage.getItem(auth().currentUser.email).then(res =>
        console.log('000' + res),
      );
      getTodo();
    }
  }, []);
  return (
    <View style={classes.container}>
      <FlatList
        extraData={isRender}
        data={task}
        renderItem={({item}) => (
          <Todo
            id={item.uuid}
            task={item.task}
            status={item.status}
            handleTask={task => {
              setOptionsToggle(!optionsToggle);
              setSelectedTask(task);
            }}
          />
        )}
        keyExtractor={item => item.uuid}
        style={{
          marginVertical: 10,
          paddingTop: 5,
        }}
      />

      <TouchableOpacity
        style={classes.float}
        onPress={() => {
          //setInfoToggle(!infoToggle);
          setInputToggle(!inputToggle);
        }}>
        <Text>
          <Icon name="plus" size={25} color={colors.secondary} />
        </Text>
      </TouchableOpacity>
      {/*This modal is info toggle */}
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
      {/*This modal is input toggle */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={inputToggle}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          //setInputToggle(!inputToggle);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInputToggle(!inputToggle)}
          style={classes.inputContainer}>
          <View style={classes.inputDialog}>
            <Input
              placeHolder={'İsteklerinizi girin...'}
              onChangeText={text => setTodo(text)}
            />
            <Button title="Kaydet" onPress={saveTodo} loading={load} />
          </View>
        </TouchableOpacity>
      </Modal>
      {/*This modal is options toggle */}
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
          <Todo task={selectedTask.task} status={selectedTask.status} />
          <OptionsMenu menuItems={options} handleItem={saveTaskStatus} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Tasks;
