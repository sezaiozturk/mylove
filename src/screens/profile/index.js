import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Input, Button, RadioButton} from '../../components';
import {Formik} from 'formik';
import style from './stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {nameSchema} from '../authentication/validationSchema';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from '../../hooks/useCalendar/useCalendar';

const Profile = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  const currentUser = auth().currentUser.uid;
  const [photoUrl, setPhotoUrl] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [genderId, setGenderId] = useState(1);
  let downloadUrl = null;
  const {showDatePicker, hidePicker, pickerMode, inline} = useCalendar();

  const handleConfirm = date => {
    hidePicker();
    setDateOfBirth(
      `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`,
    );
  };

  const selectPhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      setPhotoUrl(image.path);
    });
  };

  async function handleSave({name}) {
    setLoad(true);
    const referance = storage().ref('profile/' + currentUser);
    try {
      if (photoUrl != null) {
        await referance.putFile(photoUrl);
        downloadUrl = await referance.getDownloadURL();
      }
      firestore()
        .collection('User')
        .doc(currentUser)
        .set({
          uid: currentUser,
          downloadUrl,
          genderId,
          name,
          dateOfBirth,
        })
        .then(() => {
          navigation.navigate('MatchScreen');
          setLoad(false);
        });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }

  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header2]}>
          Profile Settings
        </Text>
      </View>
      <View style={classes.formContainer}>
        <View style={classes.photoContainer}>
          <TouchableOpacity onPress={selectPhoto} style={classes.photo}>
            {photoUrl != null ? (
              <Image style={classes.photo} source={{uri: photoUrl}} />
            ) : (
              <Text>
                <Icon
                  name={'add-photo-alternate'}
                  size={40}
                  color={colors.primary}
                />
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            name: '',
            dateOfBirth: '',
          }}
          validationSchema={nameSchema}
          onSubmit={handleSave}>
          {({handleSubmit, handleChange, values, touched, errors}) => (
            <View style={classes.inputContainer}>
              <View style={classes.genderContainer}>
                <RadioButton
                  id={1}
                  title="Kız"
                  onPress={() => {
                    setGenderId(1);
                  }}
                  active={genderId}
                />
                <RadioButton
                  id={2}
                  title="Erkek"
                  onPress={() => {
                    setGenderId(2);
                  }}
                  active={genderId}
                />
              </View>
              <Input
                title="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                touched={touched.name}
                errors={errors.name}
                placeHolder={'center name'}
              />
              <View style={classes.calendarContainer}>
                <View style={{flex: 1}}>
                  <Input
                    title="Date of Birthday"
                    value={values.dateOfBirth}
                    touched={touched.dateOfBirth}
                    errors={errors.dateOfBirth}
                    placeHolder={'center date of birthday'}
                    editable={true}
                    onChangeText={handleChange('dateOfBirth')}
                  />
                </View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={classes.calendar}>
                  <Text>
                    <Icon
                      name="calendar-month"
                      size={30}
                      color={colors.primary}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={pickerMode !== null}
                mode={pickerMode}
                onConfirm={date => {
                  hidePicker();
                  handleChange('dateOfBirth');
                  setDateOfBirth(date);
                }}
                onCancel={hidePicker}
                display={inline ? 'inline' : undefined}
              />
              <View style={classes.spaces} />
              <Button
                title="Save"
                onPress={handleSubmit}
                loading={load}></Button>
            </View>
          )}
        </Formik>
        <View style={classes.bottomContainer}>
          <Text style={classes.text}>
            Kaydet’e tıklayarak,
            <Text style={classes.link}> Kullanım Sözleşmesi</Text> ve
            <Text style={classes.link}>Gizlilik Politikasını</Text> kabul etmiş
            olursun.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

/*`${date.getDate()} / ${
                      date.getMonth() + 1
                    } / ${date.getFullYear()}`,*/
