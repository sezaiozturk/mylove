import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import style from './stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signupSchema} from '../authentication/validationSchema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const selectPhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      setPhotoUrl(image.path);
    });
  };

  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header2]}>
          Profile Settings
        </Text>
      </View>
      <View style={classes.formContainer}>
        <View style={classes.photoContainer}>
          <TouchableOpacity onPress={selectPhoto}>
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
            dateOfBirth: new Date(),
          }}
          validationSchema={signupSchema}
          onSubmit={async values => {}}>
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
              <Input
                title={'Date of Birth'}
                value={values.dateOfBirth}
                onChangeText={handleChange('dateOfBirth')}
                onBlur={handleBlur('dateOfBirth')}
                touched={touched.dateOfBirth}
                errors={errors.dateOfBirth}
                placeHolder={'center date of birth'}
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
