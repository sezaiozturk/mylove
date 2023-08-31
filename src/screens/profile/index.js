import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import style from './stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {nameSchema} from '../authentication/validationSchema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Profile = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);

  const showDatePicker = () => {
    setPickerMode('date');
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

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

  async function handleSave({userName, fullName, accounts, biography}) {
    /*const referance = storage().ref('profile/' + auth().currentUser.uid);
    try {
      if (photoUrl != null) {
        await referance.putFile(photoUrl);
        downloadUrl = await referance.getDownloadURL();
      }

      /*firestore()
        .collection('Members')
        .doc(auth().currentUser.uid)
        .set({
          uid,
          userName,
          fullName,
          selectedDepartment,
          selectedCommunities,
          accounts,
          biography,
          downloadUrl,
        })
        .then(() => {
          firestore()
            .collection('Friends')
            .doc(auth().currentUser.uid)
            .set({
              friendsUid: [],
              requestUid: [],
            })
            .then(() => {
              navigation.navigate('MemberTab');
            });
        });
    } catch (error) {
      console.log(error);
    }
    */
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
                  size={50}
                  color={colors.primary}
                />
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            name: '',
            dateOfBirth: {dateOfBirth},
          }}
          validationSchema={nameSchema}
          onSubmit={handleSave}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <View style={classes.inputContainer}>
              <Input
                title={'Name'}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                touched={touched.name}
                errors={errors.name}
                placeHolder={'center name'}
              />
              <View style={classes.calendarContainer}>
                <View style={{flex: 1}}>
                  <Input
                    title={'Date of Birthday'}
                    value={dateOfBirth}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    touched={true}
                    errors={true}
                    placeHolder={'center date of birthday'}
                    editable={false}
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
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={inline ? 'inline' : undefined}
      />
    </View>
  );
};

export default Profile;
